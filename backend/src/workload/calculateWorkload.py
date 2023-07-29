from src.serverHelper import getFromUser, getProjectID, getFromTask
from src.workload.workloadHelper import usersTaskRating, checkDeadline
from datetime import timedelta
"""
This file contains helper functions to calculate workload for a user.
"""

DEFAULT_WEIGHT = 10.0
MAX_WEIGHT = 100.0
OVERLOADED = -1
DONE_STATUS = "Done"



def calculate(currUser, db):
    #1. basic weighted task out of total tasks
    taskList = getFromUser("uid", currUser, "tasks", db)

    # Initialise number of tasks and total workload to 0
    totalWorkload = 0
    totalTaskWeight = DEFAULT_WEIGHT

    for taskId in taskList:
        projectId = getProjectID(taskId, db)

        #1. Num of tasks (not marked as "done")
        taskStatus = getFromTask(projectId, taskId, "Status", db)
        if taskStatus == DONE_STATUS:
            continue

        #2. rating system adjustments
        moodRating = usersTaskRating(projectId, taskId, currUser, db)
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
        taskPrio = getFromTask(projectId, taskId, "Priority", db)
        prioWeight = 1.0
        match taskPrio:
            case "High":
                prioWeight = 1.25
            case "Low":
                prioWeight = 0.75
            case _:
                prioWeight = 1
  
        #4. time pressure adjustments
        timeDiff = checkDeadline(projectId, taskId, db)
        deadlineWeight = 1.0
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