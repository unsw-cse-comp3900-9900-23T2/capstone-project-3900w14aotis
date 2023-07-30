from google.cloud import firestore
from fastapi import HTTPException
from src.serverHelper import findUser, isValidUser, getFromUser,getAchievement
from src.connections.connectionHelper import isConnectedTo, isRequestPending
"""
This files contains helper functions to help send a connection to a taskmaster
"""

EMAIL_FIELD = "email"

def sendConnection(userEmail, userId, db):
    """
    Sends a connection request to user given their email. This will add it to their
    "pending connections".

    Args:
        userEmail (str): email of the user that you're sending a request to
        userId (str): ID of user that is sending the request

    Returns:
        message (str): a message to show it was successful
    """
    connectionDict = {
        "UserId": userId,
        "Social Butterfly": "In Progress"
    }
    lowerEmail = userEmail.lower()
    receivingUser = getFromUser(EMAIL_FIELD, lowerEmail, "uid", db)

    if receivingUser == userId:
        raise HTTPException(
            status_code=400,
            detail={"code": "400", "message": "User cannot send a request to themselves"}
        )

    if not isValidUser(EMAIL_FIELD, lowerEmail, db):
        raise HTTPException(
            status_code=400,
            detail={"code": "400", "message": "User doesn't exist"}
        )
    
    if isConnectedTo(userId, EMAIL_FIELD, lowerEmail, db):
        raise HTTPException(
            status_code=409,
            detail={"code": "409", "message": "User is already connected!"},
        )
    
    if isRequestPending(receivingUser, userId, db):
        raise HTTPException(
            status_code=409,
            detail={"code": "409", "message": "Connection request is already pending"},
        )
        
    #If Social Butterfly Achievement is in progress, mark as done
    socialButterflyAchievement = getAchievement(db, "Social Butterfly", userId)
    for achievement in socialButterflyAchievement:
        if achievement.get("status") == "In Progress":
            achievement.reference.update(
                {
                    "currentValue": 1,
                    "status": "Done",
                }
            )
        connectionDict["Social Butterfly"] = "Done"



    taskmasterRef = findUser(EMAIL_FIELD, lowerEmail, db)
    taskmasterRef.update(
        {"pendingConnections": firestore.ArrayUnion([userId])}
    )

    

    return connectionDict