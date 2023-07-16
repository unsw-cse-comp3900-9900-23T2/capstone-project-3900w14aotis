

def userRatings(uid, db):
    """_summary_

    Args:
        uid (str): user id
        db (_type_): database

    Returns:
        ratingDict: Dictionary containing all ratings a user has given
    """
    parentDocRef = db.collection("projects").get()
    ratingDict = {
        "Very Happy": 0,
        "Happy": 0,
        "Tiring": 0,
        "Angry": 0,
        "Sad": 0,
        "Very Sad": 0,
    }
    for project in parentDocRef:
        taskDocRef = db.collection("projects").document(project.id).collection("tasks").get()
        for task in taskDocRef:  
            ratingMap = task.get("Rating")
            updateDict(ratingMap,ratingDict,uid)
            
    return ratingDict

def updateDict(ratingMap, ratingDict,uid):
    """updates the dictionary when user is found given one of the ratings

    Args:
        ratingMap (map): map of ratings
        ratingDict (dict): dictionary of ratings
        uid (str): user id
    """
    for key,value in ratingMap.items():
        for rating in value:
            if uid == rating.uid:
                ratingDict[key] += 1         
    return

