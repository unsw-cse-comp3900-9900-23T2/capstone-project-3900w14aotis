"""
This files contains helper functions that will help modularise 
"""
def findUser(queryField, queryValue, db):
    """
    Finds the user given any field in taskmasters, and the value of that field.
    i.e. "uid" or "email" will help find the user with that information.

    Args:
        queryField (str): string containing the field you will use to find the user
        queryValue (str): containing the value of the field
        db: database for the taskmasters.

    Returns:
        taskmasterRef: reference to the taskmaster's doc
    """
    docs = db.collection("taskmasters").where(queryField, "==", queryValue).limit(1).stream()
    docId = ""
    for doc in docs: 
        docId = doc.id
    taskmasterRef = db.collection("taskmasters").document(docId)
    return taskmasterRef

def getUserDoc(queryField, queryValue, db):
    """
    Retrieves the user document given a field of the taskmaster and the info for that.

    Args:
        queryField (str): string containing the field you will use to find the user
        queryValue (str): containing the value of the field
        db: database for the taskmasters.

    Returns:
        userDict: user document returned as a dictionary
    """
    currUserRef = findUser(queryField, queryValue, db)
    userDict = {}
    userDoc = currUserRef.get()
    
    if userDoc.exists:
        userDict = userDoc.to_dict()
        return userDict
    else:
        return "User not found!"