from google.cloud import firestore
from src.serverHelper import getUserDoc, getAchievement,findUser

"""
This files contains helper functions to help remove a rating from a task
"""


def addRating(projectId, taskId, uid, mood, db):
    """
    This function assigns the task to a taskmaster

    Args:
        projectId (str): ID for the project that the task is in
        taskId (str): ID for the task that you want to add a rating
        uid (str): user id of the user that is rating
        mood (str): mood that the rating will be added to
        db: database connection

    Returns:
        taskId (str): taskId of the task if successfully rated

    """
    projectDocRef = db.collection("projects").document(projectId)
    taskDocRef = projectDocRef.collection("tasks").document(taskId)

    #Check if user is part of the task's assignee list
    userRef = findUser("uid",uid,db)
    userEmail = userRef.get().get("email")
    # If user isnt part of task, return none
    assigneeList = taskDocRef.get().get("Assignees")
    if userEmail not in assigneeList:
        return None

    #If New Critic Achievement is in progress, mark as done
    achievementDoc = getAchievement(db,"New Critic", uid)
    for achievement in achievementDoc:
        if achievement.get("status") == "In Progress":
            achievement.reference.update(
                {
                "achievement": "New Critic",
                "description": "Rate your first task",
                "target": 1,
                "currentValue": 1,
                "status": "Done",
                }
            ) 

    userDoc = getUserDoc("uid", uid, db)
    addTaskUserObj = {
        "uid": userDoc["uid"],
        "firstName": userDoc["firstName"],
        "lastName": userDoc["lastName"],
        "email": userDoc["email"],
    }

    ratingDict = taskDocRef.get().to_dict()["Rating"]
    for user in ratingDict[mood]:
        if len(user) > 0 and user["uid"] == uid:
            ratingDict[mood].remove(user)
            taskDocRef.update({"Rating": ratingDict})
            return taskId

    for key, value in ratingDict.items():
        for user in value:
            if user["uid"] == uid:
                value.remove(user)
                break

    ratingDict[mood].append(addTaskUserObj)

    taskDocRef.update({"Rating": ratingDict})

    return taskId
