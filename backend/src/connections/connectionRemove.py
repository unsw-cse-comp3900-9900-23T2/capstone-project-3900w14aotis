from google.cloud import firestore
from src.serverHelper import findUser, getUserDoc
"""
This files contains helper functions to help send a connection to a taskmaster
"""
def unfriend(currUser, userId, db):
    # removes connection from currUser
    currUserRef = findUser("uid", currUser, db)
    currUserDoc = getUserDoc("uid", currUser, db)

    # check to make sure they're connected
    connectionsList = currUserDoc.pop("connectedTo")
    if userId not in connectionsList:
        return "Users are not connected!"

    currUserRef.update(
        {"connectedTo": firestore.ArrayRemove([userId])}
    )

    # removes currUser from other user's connections
    userRef = findUser("uid", userId, db)
    userRef.update(
        {"connectedTo": firestore.ArrayRemove([currUser])}
    )
    return f"{userId} removed from {currUser}'s connections"