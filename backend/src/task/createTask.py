from src.serverHelper import getAchievement, findUser, getFromUser
from google.cloud import firestore
from fastapi import HTTPException
from src.workload.calculateWorkload import updateWorkload
from src.connections.connectionHelper import isConnectedTo

"""
This file contains helper functions to create a new task within a project.
"""


def createNewTask(newTask, projectId, db):
    """
    This takes in the details of the new task to be added including a title,
    description, deadline, and assignee as well as a project ID to add the task to.
    This adds a task in the projects database as well as the taskmaster's list of
    tasks.
    Args:
        newTask (Task): title, description, deadline, assignee
        projectId (string): reference ID of the project
        db : database connection

    Returns:
        obj: this contains the document reference number if succesfully added
    """

    # If Innovator Achievement is in progress, mark as done
    docs = getAchievement(db, "Innovator", newTask.creatorId)
    for achievement in docs:
        if achievement.get("status") == "In Progress":
            achievement.reference.update(
                {
                    "currentValue": 1,
                    "status": "Done",
                }
            )

    parentDocId = projectId
    subCollection = "tasks"
    parentDocRef = db.collection("projects").document(parentDocId)

    # check if assignee is in project
    projectMembers = parentDocRef.get().get("members")
    for email in newTask.assignees:
        assigneeID = getFromUser("email", email, "uid", db)
        
        if assigneeID not in projectMembers:
            raise HTTPException(
                status_code=400,
                detail={"code": "400", "message": "User is not in project!"},
            )
        if not isConnectedTo(newTask.creatorId, "email", email, db):
            raise HTTPException(
                status_code=400,
                detail={"code": "400", "message": "Assignee is not connected to current user"},
            )            

    taskRef = parentDocRef.collection(subCollection).add(
        {
            "Title": newTask.title,
            "Description": newTask.description,
            "Deadline": newTask.deadline,
            "Assignees": newTask.assignees,
            "Priority": newTask.priority,
            "Status": newTask.status,
            "Rating": {
                "Very Happy": [],
                "Happy": [],
                "Neutral": [],
                "Sad": [],
                "Very Sad": [],
            },
            "CreationTime": newTask.creationTime,
        }
    )

    # Assigns task to taskmasters in given newTask object
    for email in newTask.assignees:
        emailLower = email.lower()
        taskmasterRef = findUser("email", emailLower, db)
        taskmasterRef.update({"tasks": firestore.ArrayUnion([taskRef[1].id])})

        # updates workload when new task is created and the person is assigned to it.
        userId = taskmasterRef.get().get("uid")

        updateWorkload(userId, db)

    return taskRef[1].id
