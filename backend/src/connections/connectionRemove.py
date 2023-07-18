from google.cloud import firestore
from fastapi import HTTPException
from src.serverHelper import findUser
from src.connections.connectionHelper import isConnectedTo
"""
This files contains helper functions to help send a connection to a taskmaster
"""
def unfriend(currUser, userId, db):
    # check if users are connected
    if not isConnectedTo(currUser, "uid", userId, db):
        raise HTTPException(
            status_code=400,
            detail={"code": "400", "message": "User is not a connection!"},
        )

    # removes connection from currUser
    currUserRef = findUser("uid", currUser, db)
    currUserRef.update(
        {"connectedTo": firestore.ArrayRemove([userId])}
    )

    # removes currUser from other user's connections
    userRef = findUser("uid", userId, db)
    userRef.update(
        {"connectedTo": firestore.ArrayRemove([currUser])}
    )
    userDoc = userRef.get().to_dict()
    userFirstName = userDoc.get('firstName')
    userLastName = userDoc.get('lastName')


    currUserDoc = currUserRef.get().to_dict()
    currUserFirst = currUserDoc.get('firstName')
    currUserLast = currUserDoc.get('lastName')



    return f"{userFirstName} {userLastName} removed from {currUserFirst} {currUserLast}'s connections"