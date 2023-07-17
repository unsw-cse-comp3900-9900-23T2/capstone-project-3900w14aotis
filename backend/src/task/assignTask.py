from google.cloud import firestore
from src.serverHelper import findUser
from src.connections.connectionHelper import isConnectedTo

"""
This files contains helper functions to help assign a task to any taskmaster
"""


def addAssignee(projectId, taskId, email, currUser, db):
    """
    This function assigns the task to a taskmaster

    Args:
        projectId (str): ID for the project that the task is in
        taskId (str): ID for the task that you want to assign someone to
        email (str): email for the person you want to assign
        db: database connection
    
    Returns:
        email (str): email if the user is successfully added

    """
    userEmail = email.lower()
    # ref for the task details document
    projectRef = db.collection("projects").document(projectId)
    taskRef = projectRef.collection("tasks").document(taskId)

    # ref for the taskmaster's details document
    taskmasterRef = findUser("email", userEmail, db)

    # check if users are connected
    if not isConnectedTo(currUser, "email", userEmail, db):
        return "Users are not connected!"

    # adds task in taskmaster's task list
    taskmasterRef.update({"tasks": firestore.ArrayUnion([taskId])})

    # adds taskmaster in assignees array for the task
    taskRef.update({"Assignees": firestore.ArrayUnion([userEmail])})

    return f"User: {email} successfully added"


def deleteAssignee(projectId, taskId, email, db):
    """
    This function removes an assignee from a task.

    Args:
        projectId (str): ID for the project that the task is in
        taskId (str): ID for the task that you want to remove someone from
        email (str): email of the person you want to remove
        db: database connection

    Returns:
        email (str): email if the user is successfully added
    """
    userEmail = email.lower()
    # reference to task
    projectRef = db.collection("projects").document(projectId)
    taskRef = projectRef.collection("tasks").document(taskId)

    # remove assignee from task assignee list
    taskRef.update({"Assignees": firestore.ArrayRemove([email])})

    # ref for the taskmaster's details document
    taskmasterRef = findUser("email", email.lower(), db)

    # remove task from taskmaster's task list
    taskmasterRef.update({"tasks": firestore.ArrayRemove([taskId])})

    return email
