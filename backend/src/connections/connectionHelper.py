from src.serverHelper import getUserDoc, getUserId
"""
This files contains helper functions to help send a connection to a taskmaster
"""
def isConnectedTo(currUser, queryField, queryValue, db):
    """
    Returns true if the current user and user given are connected

    Args:
        currUser (str): current user's ID
        queryField (str): field that you have information for 
                        (e.g. email, uid, first/last name) of a user
        queryValue (str): information for the field you declared
        db: database

    Returns:
        bool: returns true or false depending on if the patron is connected
    """
    userId = getUserId(queryField, queryValue, db)
    doc = getUserDoc("uid", currUser, db)
    connectionsList = doc.pop("connectedTo")
    if userId in connectionsList:
        return True
    return False