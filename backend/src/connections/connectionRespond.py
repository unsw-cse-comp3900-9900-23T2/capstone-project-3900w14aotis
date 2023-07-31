from google.cloud import firestore
from src.serverHelper import findUser
"""
This files contains helper functions to help send a connection to a taskmaster
"""
def acceptConnection(currUser, userId, db):
    """
    Accepts a connection to current user.

    Args:
        currUser (str): user Id of the current user
        userId (str): user Id of the user you want to connect with
        db: database
    """
    # removes pending connection
    currUserRef = findUser("uid", currUser, db)
    currUserRef.update(
        {"pendingConnections": firestore.ArrayRemove([userId])}
    )
    # updates current user's connections
    currUserRef.update(
        {"connectedTo": firestore.ArrayUnion([userId])}
    )
    # updates sender's connections
    userRef = findUser("uid", userId, db)
    userRef.update(
        {"connectedTo": firestore.ArrayUnion([currUser])}
    )
    return

def declineConnection(currUser, userId, db):
    """
    Declines a connection to current user.

    Args:
        currUser (str): user Id of the current user
        userId (str): user Id of the user you want to decline
        db: database
    """
    userRef = findUser("uid", currUser, db)
    userRef.update(
        {"pendingConnections": firestore.ArrayRemove([userId])}
    )
    return