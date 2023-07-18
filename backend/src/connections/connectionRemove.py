from google.cloud import firestore
from src.serverHelper import findUser
from src.connections.connectionHelper import isConnectedTo
"""
This files contains helper functions to help send a connection to a taskmaster
"""
def unfriend(currUser, userId, db):
    # check if users are connected
    if not isConnectedTo(currUser, "uid", userId, db):
        return "Users are not connected!"

    # removes connection from currUser
    currUserRef = findUser("uid", currUser, db)
    currUserRef.update(
        {"connectedTo": firestore.ArrayRemove([userId])}
    )

    # removes currUser from other user's connections
    userRef = findUser("uid", userId, db)
    userRef.update(
        {"connectedTo": firestore.ArrayRemove([currUser])}
    )
    return f"{userId} removed from {currUser}'s connections"