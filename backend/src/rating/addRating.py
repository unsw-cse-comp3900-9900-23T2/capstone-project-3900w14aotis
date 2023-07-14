from google.cloud import firestore
from src.serverHelper import getUserDoc

"""
This files contains helper functions to help add a rating to a task
"""


def addRating(projectId, taskId, uid, mood, db):
    """
    This function assigns the task to a taskmaster

    Args:
        projectId (str): ID for the project that the task is in
        taskId (str): ID for the task that you want to assign someone to
        uid (str): user id
        db: database connection

    Returns:
        email (str): email if the user is successfully added

    """
    projectDocRef = db.collection("projects").document(projectId)
    taskDocRef = projectDocRef.collection("tasks").document(taskId)

    userDoc = getUserDoc("uid", uid, db)

    addTaskUserObj = {
        "uid": userDoc["uid"],
        "firstName": userDoc["firstName"],
        "lastName": userDoc["lastName"],
        "email": userDoc["email"],
    }

    ratingDict = taskDocRef.get().to_dict()["Rating"]
    for key, value in ratingDict.items():
        for user in value:
            if user["uid"] == uid:
                value.remove(user)
                break

    ratingDict[mood].append(addTaskUserObj)

    taskDocRef.update({"Rating": ratingDict})

    return taskId
