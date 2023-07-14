from google.cloud import firestore
from src.serverHelper import findUser
"""
This files contains helper functions to help send a connection to a taskmaster
"""

def sendConnection(userEmail, userId, db):
    lowerEmail = userEmail.lower()
    taskmasterRef = findUser("email", lowerEmail, db)
    
    taskmasterRef.update(
        {"pendingConnections": firestore.ArrayUnion([userId])}
    )
    return