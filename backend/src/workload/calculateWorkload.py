from src.serverHelper import getUserDoc
from src.rating.ratingHelper import findUserRating
"""
This file contains helper functions to calculate workload for a user.
"""

MAX_TASKS = 10.0

def calculateWorkload(currUser, db):
    userDoc = getUserDoc("uid", currUser, db)
    
    #1. basic weighted task out of total tasks
    taskList = userDoc.pop("tasks")
    taskNum = len(taskList)
    taskWeight = taskNum/MAX_TASKS

    for task in taskList:
        #2. rating system?
        
        
        #3. priority system
        taskPrio = task['priority']
        prioWeight = 1
        match taskPrio:
            case "High":
                prioWeight = -0.5
            case "Low":
                prioWeight = 0.5
            case _:
                prioWeight = 1
