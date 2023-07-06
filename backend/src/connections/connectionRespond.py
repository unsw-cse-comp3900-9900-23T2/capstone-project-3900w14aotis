from google.cloud import firestore
from src.serverHelper import findUser
"""
This files contains helper functions to help send a connection to a taskmaster
"""
def acceptConnection(currUser, userId, db):
    userRef = findUser("uid", currUser, db)
    userRef.update(
        {"pendingConnections": firestore.ArrayRemove([userId])}
    )
    userRef.update(
        {"connectedTo": firestore.ArrayUnion([userId])}
    )
    return

def declineConnection(currUser, userId, db):
    userRef = findUser("uid", currUser, db)
    userRef.update(
        {"pendingConnections": firestore.ArrayRemove([userId])}
    )
    return