from google.cloud import firestore
"""
This files contains helper functions to help send a connection to a taskmaster
"""

def sendConnection(userEmail, userId, db):
    docs = db.collection("taskmasters").where("email", "==", userEmail).limit(1).stream()
    docId = ""
    for doc in docs: 
        docId = doc.id
    taskmasterRef = db.collection("taskmasters").document(docId)
    
    taskmasterRef.update(
        {"pendingConnections": firestore.ArrayUnion([userId])}
    )