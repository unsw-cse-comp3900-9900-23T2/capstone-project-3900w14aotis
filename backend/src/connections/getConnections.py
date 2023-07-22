from src.serverHelper import getUserDoc, findUser

EMPTY = 0
PENDING_CONNECTION = "pendingConnections"

"""
This files contains helper functions to help get a list of connections for a taskmaster
"""
def getConnections(userId, listType, db):
    doc = getUserDoc("uid", userId, db)
    connectionsList = doc.pop(listType)
    finalList = []
    if len(connectionsList) == EMPTY:
        if listType == PENDING_CONNECTION:
            return "No pending connections found"
        return "No connections found"
    for id in connectionsList:
        userRef = findUser("uid", id, db)
        tempdoc = userRef.get()
        if tempdoc.exists:
            userDoc = tempdoc.to_dict()
            userDict = {
            "firstName": userDoc.get("firstName"),
            "lastName": userDoc.get("lastName"),
            "email": userDoc.get("email"),
            "profileImage": userDoc.get("profileImage"),
            "uid": id
            }
            finalList.append(userDict)
        else:
            return "Could not retrieve connected user's data"
        
    return finalList
