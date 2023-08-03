from src.serverHelper import getFromUser, getProjectID, findUser, getTaskDoc
from src.workload.workloadHelper import usersTaskRating, checkDeadline
from datetime import timedelta, datetime, timezone
"""
This file contains helper functions to calculate workload for a user.
"""

DEFAULT_WEIGHT = 10.0
MAX_WEIGHT = 100.0
OVERLOADED = -1
DONE_STATUS = "Done"

# NO_DATE is Jan 1, 1970 (default datetime date)
# or: "1970-01-01T00:00:00+00:00"
NO_DATE = datetime.fromtimestamp(0, timezone.utc)

def updateWorkload(userId, db):
    """
    Updates workload field in the taskmaster

    Args:
        userId (str): user id of the user
        db: database

    Returns:
        workloadValue (float): the new value of the workload
    """
    workloadValue = calculate(userId, db)
    userRef = findUser("uid", userId, db)
    userRef.update({"workload": workloadValue})
    return f"Workload updated with value {workloadValue}"

def calculate(currUser, db):
    """
    Calculates the workload of a user based on four factors:
    1. number of tasks
    2. their mood rating of the task
    3. priority status of the task
    4. how close the user is to the task deadline

    Args:
        currUser (str): user id of the user
        db: database

    Returns:
        totalWorkload (float): the new calculated value of the workload
    """
    #1. basic weighted task out of total tasks
    taskList = getFromUser("uid", currUser, "tasks", db)

    # Initialise number of tasks and total workload to 0
    totalWorkload = 0
    totalTaskWeight = DEFAULT_WEIGHT

    for taskId in taskList:
        projectId = getProjectID(taskId, db)
        taskDoc = getTaskDoc(projectId, taskId, db)

        #1. Num of tasks (not marked as "done")
        taskStatus = taskDoc["Status"]
        if taskStatus == DONE_STATUS:
            continue

        #2. rating system adjustments
        moodRating = usersTaskRating(taskDoc.get("Rating"), currUser)
        moodWeight = 1.0
        match moodRating:
            case "Very Happy":
                moodWeight = 0.5
            case "Happy":
                moodWeight = 0.75
            case "Neutral":
                moodWeight = 1
            case "Sad":
                moodWeight = 1.25
            case "Very Sad":
                moodWeight = 1.5
            case _:
                moodWeight = 1
        
        #3. priority system adjustments
        taskPrio = taskDoc["Priority"]
        prioWeight = 1.0
        match taskPrio:
            case "High":
                prioWeight = 1.25
            case "Low":
                prioWeight = 0.75
            case _:
                prioWeight = 1
  
        #4. time pressure adjustments
        deadlineWeight = 1.0
        timeDiff = checkDeadline(taskDoc["Deadline"])
        if timeDiff != NO_DATE:
            if timeDiff <= timedelta(days=3):
                deadlineWeight = 1.25
            elif timeDiff >= timedelta(days=7):
                deadlineWeight = 0.75
            else:
                deadlineWeight = 1.0

        totalTaskWeight = DEFAULT_WEIGHT * moodWeight * prioWeight * deadlineWeight
        totalWorkload += totalTaskWeight

    # If workload is greater than 100%, workload is overloaded
    if totalWorkload > MAX_WEIGHT:
        return OVERLOADED

    return totalWorkload

def getWorkloadValue(userId, db):
    """
    Gets the workload value of a user

    Args:
        userId (str): user id of the user
        db: database

    Returns:
        workloadStored (float): the stored value of workload
    """
    workloadStored = getFromUser("uid", userId, "workload", db)
    return workloadStored