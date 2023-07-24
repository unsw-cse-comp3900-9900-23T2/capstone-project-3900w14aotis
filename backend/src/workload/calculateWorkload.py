from src.serverHelper import getUserDoc, getProjectID, getTaskDoc
from src.workload.workloadHelper import usersTaskRating
"""
This file contains helper functions to calculate workload for a user.
"""

DEFAULT_WEIGHT = 10.0
MAX_WEIGHT = 100.0

def calculate(currUser, db):
    userDoc = getUserDoc("uid", currUser, db)
    
    #1. basic weighted task out of total tasks
    taskList = userDoc.pop("tasks")

    # max num tasks is 10, this is full workload (100%)
    taskNum = len(taskList)
    if taskNum > 10:
        return MAX_WEIGHT

    totalWorkload = 0

    for taskId in taskList:
        #2. rating system?
        projectId = getProjectID(taskId, db)
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
        
        
        #3. priority system
        taskDoc = getTaskDoc(projectId, taskId, db)
        taskPrio = taskDoc.get("Priority")
        prioWeight = 1.0
        match taskPrio:
            case "High":
                prioWeight = 1.5
            case "Low":
                prioWeight = 0.5
            case _:
                prioWeight = 1

        totalTaskWeight = DEFAULT_WEIGHT * moodWeight * prioWeight
        totalWorkload += totalTaskWeight
        
    # totalWorkload = taskNum * DEFAULT_WEIGHT
    
    if totalWorkload > MAX_WEIGHT:
        return MAX_WEIGHT

    return totalWorkload