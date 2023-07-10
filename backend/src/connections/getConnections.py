from google.cloud import firestore
from src.serverHelper import getUserDoc
"""
This files contains helper functions to help get a list of connections for a taskmaster
"""
def getConnections(currUser, db):
    doc = getUserDoc("uid", currUser, db)
    connectionsList = doc.pop("connectedTo")
    
    
