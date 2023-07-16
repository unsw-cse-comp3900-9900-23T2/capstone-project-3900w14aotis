from src.serverHelper import getUserDoc, getUserId
"""
This file contains helper functions to calculate workload for a user.
"""

def calculateWorkload(currUser, db):
    userDoc = getUserDoc("uid", currUser, db)
    userDoc.pop()