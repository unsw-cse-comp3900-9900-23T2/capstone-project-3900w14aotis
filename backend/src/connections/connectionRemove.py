from google.cloud import firestore
from src.serverHelper import findUser
"""
This files contains helper functions to help send a connection to a taskmaster
"""
def unfriend(currUser, userId, db):
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
    return