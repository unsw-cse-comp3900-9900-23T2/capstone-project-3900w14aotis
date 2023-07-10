from google.cloud import firestore
from src.serverHelper import getUserDoc, findUser

EMPTY = 0

"""
This files contains helper functions to help get a list of connections for a taskmaster
"""
def getConnections(userId, listType, db):
    doc = getUserDoc("uid", userId, db)
    connectionsList = doc.pop(listType)
    finalDict = {}
    if len(connectionsList) == EMPTY:
        return "No connections found"
    for id in connectionsList:
        userRef = findUser("uid", id, db)
        tempdoc = userRef.get()
        if tempdoc.exists:
            userDoc = tempdoc.to_dict()
            finalDict[id] = {
            "firstName": userDoc.get("firstName"),
            "lastName": userDoc.get("lastName"),
            "email": userDoc.get("email"),
            "profileImage": userDoc.get("profileImage")
            }
        else:
            return "Could not retrieve connected user's data"
        
    return finalDict
