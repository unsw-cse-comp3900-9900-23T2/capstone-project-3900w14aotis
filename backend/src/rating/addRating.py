from google.cloud import firestore
from src.serverHelper import getUserDoc, getAchievement, findUser

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
    taskDict = {
        "TaskID": taskId,
        "New Critic": "In Progress",
        "Connoisseur": "In Progress",
    }
    # Check if user is part of the task's assignee list
    userRef = findUser("uid", uid, db)
    userEmail = userRef.get().get("email")
    # If user isnt part of task, return none
    assigneeList = taskDocRef.get().get("Assignees")
    if userEmail not in assigneeList:
        return None

    # If New Critic Achievement is in progress, mark as done
    achievementDoc = getAchievement(db, "New Critic", uid)
    for achievement in achievementDoc:
        if achievement.get("status") == "In Progress":
            achievement.reference.update(
                {
                    "currentValue": 1,
                    "status": "Done",
                }
            )
        taskDict["New Critic"] = "Done"

    # If task has alrdy been rated the specified mood, remove 
    # the mood in both the task and the user
    ratingDict = taskDocRef.get().to_dict()["Rating"]
    userRatingDict = userRef.get().get("Rating")
    for user in ratingDict[mood]:
        if len(user) > 0 and user["uid"] == uid:
            ratingDict[mood].remove(user)
            taskDocRef.update({"Rating": ratingDict})
            break

    for task in userRatingDict[mood]:
        if len(task) > 0 and task == taskId:
            userRatingDict[mood].remove(task)
            userRef.update({"Rating": userRatingDict})
            return None


    # Connoisser Achievement
    connoisseurAchievement = getAchievement(db, "Connoisseur", uid)
    for achievement in connoisseurAchievement:
        goal = achievement.get("target")
        currentValue = achievement.get("currentValue")
        # If Achievement is alrdy done, skip
        if currentValue == goal:
            taskDict["Connoisseur"] = "Done"
            break

        else:
            currentValue += 1
            # If currentValue meets the goal, update achievement status to done
            if currentValue == goal:
                achievement.reference.update(
                    {"currentValue": currentValue, "status": "Done"}
                )
                taskDict["Connoisseur"] = "Done"
            # Otherwise, only update currValue
            else:
                achievement.reference.update(
                    {
                        "currentValue": currentValue,
                    }
                )

    userDoc = getUserDoc("uid", uid, db)
    addTaskUserObj = {
        "uid": userDoc["uid"],
        "firstName": userDoc["firstName"],
        "lastName": userDoc["lastName"],
        "email": userDoc["email"],
    }

    for key, value in ratingDict.items():
        for user in value:
            if user["uid"] == uid:
                value.remove(user)
                break
    
    for moodRating, list in userRatingDict.items():
        for task in list:
            if task == taskId:
                list.remove(task)
                break

    ratingDict[mood].append(addTaskUserObj)
    taskDocRef.update({"Rating": ratingDict})

    userRatingDict[mood].append(taskId)
    userRef.update({"Rating": userRatingDict})


    return taskDict
