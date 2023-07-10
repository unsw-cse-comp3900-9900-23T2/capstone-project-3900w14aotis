from google.cloud import firestore
from src.serverHelper import getUserDoc, findUser
"""
This files contains helper functions to help get a list of connections for a taskmaster
"""
def getConnections(currUser, db):
    doc = getUserDoc("uid", currUser, db)
    connectionsList = doc.pop("connectedTo")
    finalDict = {}
    for id in connectionsList:
        userRef = findUser("uid", id, db)
        finalDict[id] = {
            "firstName": userRef.get("firstName"),
            "lastName": userRef.get("lastName"),
            "email": userRef.get("email"),
            "profileImage": userRef.get("profileImage")
        }
