from google.cloud import firestore
from src.serverHelper import findUser
"""
This files contains helper functions to help send a connection to a taskmaster
"""

def sendConnection(userEmail, userId, db):
    taskmasterRef = findUser("email", userEmail, db)
    
    taskmasterRef.update(
        {"pendingConnections": firestore.ArrayUnion([userId])}
    )