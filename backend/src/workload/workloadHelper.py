from src.serverHelper import getFromTask
from datetime import datetime, timedelta, timezone
"""
This file contains helper functions for anything to do with workload calculation.
"""

def usersTaskRating(projectId, taskId, currUser, db):
    """
    Gets the user's rating of a specific task.

    Args:
        projectId (str): ID of the project that the task is in
        taskId (str): ID of the task you want to get rating of
        currUser (str): current user's ID
        db: database

    Returns:
        mood (str): mood rating that the person rated the task as
    """
    ratingMap = getFromTask(projectId, taskId, "Rating", db)
    for mood, moodList in ratingMap.items():
        for entry in moodList:
            if entry["uid"] == currUser:
                return mood
        
    # if mood not returned/found, return default "Neutral" mood
    return "Neutral"

def checkDeadline(projectId, taskId, db):
    """
    Checks a the deadline of a task and compares it with the current time.

    Args:
        projectId (str): ID of the project that the task is in
        taskId (str): ID of the task you want to get time of
        db: database

    Returns:
        timeDiff (timedelta): time difference between deadline and now
    """
    taskDeadline = str(getFromTask(projectId, taskId, "Deadline", db))
    dtDeadline = datetime.fromisoformat(taskDeadline)
    timeNow = datetime.now(timezone.utc)
    timeDiff = dtDeadline - timeNow
    
    return timeDiff