from src.serverHelper import getFromUser

def checkAchievement(uid, db):
    """
    Returns the user's hidden achievement status 

    Args:
        uid (str): user id of the user
        db (_type_): database

    Returns:
        achievementHidden (bool): boolean of the achievementHidden status
    """
    achievementHidden = getFromUser("uid", uid, "achievementHidden", db)
    
    return achievementHidden
        
