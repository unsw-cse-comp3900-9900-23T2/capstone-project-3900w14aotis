from google.cloud import firestore
from fastapi import HTTPException
from src.serverHelper import findUser, getUserDoc, isValidUser
from src.connections.connectionHelper import isConnectedTo
"""
This files contains helper functions to help send a connection to a taskmaster
"""

def sendConnection(userEmail, userId, db):
    lowerEmail = userEmail.lower()

    if not isValidUser("email", lowerEmail, db):
        raise HTTPException(
            status_code=400,
            detail={"code": "400", "message": "User doesn't exist"}
        )
    
    if isConnectedTo(userId, "email", userEmail, db):
        raise HTTPException(
            status_code=409,
            detail={"code": "409", "message": "User is already connected!"},
        )
    
    # check if user has already sent a req to given email
    userDoc = getUserDoc("email", lowerEmail, db)
    pendingList = userDoc.pop("pendingConnections")
    if userId in pendingList:
        raise HTTPException(
            status_code=409,
            detail={"code": "409", "message": "User already sent a request"},
        )
    

    taskmasterRef = findUser("email", lowerEmail, db)
    
    taskmasterRef.update(
        {"pendingConnections": firestore.ArrayUnion([userId])}
    )
    return "Connection request successfully sent!"