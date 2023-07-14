from google.cloud import firestore
from src.serverHelper import getUserDoc, getUserId
"""
This files contains helper functions to help send a connection to a taskmaster
"""
def isConnectedTo(currUser, queryField, queryValue, db):
    userId = getUserId(queryField, queryValue, db)
    doc = getUserDoc("uid", currUser, db)
    connectionsList = doc.pop("connectedTo")
    if userId in connectionsList:
        return True
    return False