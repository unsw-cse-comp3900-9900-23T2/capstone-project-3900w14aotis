from src.serverHelper import getTaskDoc
"""
This files contains helper functions that will help for anything to do with ratings
"""

def findUserRating(projectId, taskId, currUser, db):
    taskDoc = getTaskDoc(projectId, taskId, db)
    ratingMap = taskDoc.pop("Rating")
    # check each mood (Very Happy, Happy, Neutral, Sad, Very Sad)
    for mood in ratingMap:
        # iterate through array of dictionaries
        for user in mood:
            # access uid in the dictionary
            if user['uid'] == currUser:
                return mood
            
    return "User not found in ratings"