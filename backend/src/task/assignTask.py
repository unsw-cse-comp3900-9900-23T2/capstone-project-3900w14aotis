from google.cloud import firestore

"""
This files contains helper functions to help assign a task to any taskmaster
"""


def addAssignee(projectId, taskId, userId, db):
    """
    This function assigns the task to a taskmaster

    Args:
        projectId (str): ID for the project that the task is in
        taskId (str): ID for the task that you want to assign someone to
        userId (str): ID for the person you want to assign
        db: database connection


    """
    # ref for the task details document
    projectRef = db.collection("projects").document(projectId)
    taskRef = projectRef.collection("tasks").document(taskId)

    # adds user in assignees array for the task
    taskRef.update({"Assignees": firestore.ArrayUnion([userId])})

    # ref for the taskmaster's details document
    docs = db.collection("taskmasters").where("uid", "==", userId).limit(1).stream()
    docId = ""
    for doc in docs:
        docId = doc.id
    taskmasterRef = db.collection("taskmasters").document(docId)

    # adds task in taskmaster's task list
    taskmasterRef.update({"tasks": firestore.ArrayUnion([taskId])})

    return userId


def deleteAssignee(projectId, taskId, userId, db):
    """
    This function removes an assignee from a task.

    Args:
        projectId (str): ID for the project that the task is in
        taskId (str): ID for the task that you want to remove someone from
        userId (str): uID of the person you want to remove
        db: database connection

    Returns:
        userId (str): uID if the user is successfully added
    """
    # reference to task
    projectRef = db.collection("projects").document(projectId)
    taskRef = projectRef.collection("tasks").document(taskId)

    # remove assignee from task assignee list
    taskRef.update({"Assignees": firestore.ArrayRemove([userId])})

    # ref for the taskmaster's details document
    docs = db.collection("taskmasters").where("uid", "==", userId).limit(1).stream()
    docId = ""
    for doc in docs:
        docId = doc.id
    taskmasterRef = db.collection("taskmasters").document(docId)

    # remove task from taskmaster's task list
    taskmasterRef.update({"tasks": firestore.ArrayRemove([taskId])})

    return userId
