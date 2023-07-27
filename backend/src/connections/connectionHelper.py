from src.serverHelper import getUserDoc, getFromUser
from fastapi import HTTPException
"""
This files contains helper functions to help send a connection to a taskmaster
"""
def isConnectedTo(currUser, queryField, queryValue, db):
    """
    Returns true if the current user and user given are connected

    Args:
        currUser (str): current user's ID
        queryField (str): field that you have information for 
                        (e.g. email, uid, first/last name) of a user
        queryValue (str): information for the field you declared
        db: database

    Returns:
        bool: returns true or false depending on if the patron is connected
    """
    userId = getFromUser(queryField, queryValue, "uid", db)
    doc = getUserDoc("uid", currUser, db)
    connectionsList = doc.pop("connectedTo")
    if userId in connectionsList:
        return True
    return False

def isRequestPending(senderId, receiverId, db):
    userDoc = getUserDoc("uid", senderId, db)
    pendingList = userDoc.pop("pendingConnections")
    if receiverId in pendingList:
        return True
    return False
    