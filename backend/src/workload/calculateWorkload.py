from src.serverHelper import getUserDoc
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

    totalWorkload = taskNum * DEFAULT_WEIGHT
    
    if totalWorkload > MAX_WEIGHT:
        return MAX_WEIGHT

    return totalWorkload