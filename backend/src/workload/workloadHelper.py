from src.serverHelper import getTaskDoc
from fastapi import HTTPException
"""
This file contains helper functions for anything to do with workload calculation.
"""

def usersTaskRating(projectId, taskId, currUser, db):
    taskDoc = getTaskDoc(projectId, taskId, db)
    ratingMap = taskDoc.get("Rating")
    for mood, moodList in ratingMap.items():
        if currUser in moodList:
            return mood

    raise HTTPException(
            status_code=400,
            detail={"code": "400", "message": "Rating doesn't exist"},
        )