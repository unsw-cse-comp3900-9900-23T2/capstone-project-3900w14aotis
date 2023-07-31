def checkAchievement(uid, db):
    """
    returns the user's hidden achievement status 

    Args:
        uid (str): user id
        db (_type_): database

    Returns:
        achievementHidden (bool): boolean of the achievementHidden status
    """
    achievementHidden = bool
    docs = db.collection("taskmasters").where("uid", "==", uid).limit(1).stream()  
    for doc in docs:
        achievementHidden = doc.get("achievementHidden")
    
    return achievementHidden
        
