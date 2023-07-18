from google.cloud import firestore
from src.serverHelper import findUser
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
    parentDocId = projectId
    subCollection = "tasks"
    parentDocRef = db.collection("projects").document(parentDocId)

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
        }
    )

    # Assigns task to taskmasters in given newTask object
    for email in newTask.assignees:
        taskmasterRef = findUser("email", email.lower(), db)
        taskmasterRef.update({"tasks": firestore.ArrayUnion([taskRef[1].id])})

    return taskRef[1].id