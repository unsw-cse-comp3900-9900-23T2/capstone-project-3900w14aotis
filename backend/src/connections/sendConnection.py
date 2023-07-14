from google.cloud import firestore
from src.serverHelper import findUser
from src.connections.connectionHelper import isConnectedTo
"""
This files contains helper functions to help send a connection to a taskmaster
"""

def sendConnection(userEmail, userId, db):
    lowerEmail = userEmail.lower()
    
    if isConnectedTo(userId, "email", userEmail, db):
        return "User is already connected!"

    taskmasterRef = findUser("email", lowerEmail, db)
    
    taskmasterRef.update(
        {"pendingConnections": firestore.ArrayUnion([userId])}
    )
    return "Connection request successfully sent!"