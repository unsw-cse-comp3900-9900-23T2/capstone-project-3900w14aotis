from src.serverHelper import getUserDoc, getFromUser
"""
This file contains helper functions to help send a connection to a taskmaster
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

def isRequestPending(firstUser, secondUser, db):
    """
    Checks if the first user has already sent a connection request to the second user.
    Checks both user's pending connections

    Args:
        firstUser (str): the user you want to check pending connections for
        secondUser (str): the user you want to check if they've sent the connection
        db: database

    Returns:
        bool: true if request is already pending, false otherwise
    """
    userDoc = getUserDoc("uid", firstUser, db)
    pendingList = userDoc.pop("pendingConnections")
    if secondUser in pendingList:
        return True
    
    senderDoc = getUserDoc("uid", secondUser, db)
    pendingList = senderDoc.pop("pendingConnections")
    if firstUser in pendingList:
        return True
    
    return False
    