from src.serverHelper import getAchievement, findUser, getFromUser
from google.cloud import firestore

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

    # Assigns task to taskmasters in given newTask object
    ratingList = []
    for email in newTask.assignees:
        emailLower = email.lower()
        taskmasterRef = findUser("email", emailLower, db)
        taskmasterRef.update({"tasks": firestore.ArrayUnion([taskRef[1].id])})

        userId = getFromUser("email", emailLower, db)
        ratingList.append(userId)

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
                "Neutral": ratingList,
                "Sad": [],
                "Very Sad": [],
            },
            "CreationTime": newTask.creationTime,
        }
    )
        

    return taskRef[1].id
