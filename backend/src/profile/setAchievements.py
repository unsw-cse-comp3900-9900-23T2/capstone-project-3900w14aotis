from src.serverHelper import findUser

def setAchievement(uid, db, hideAchievement):
    """
    Sets if achievements is hidden or not

    Args:
        uid (str): user Id of the user
        db: database
        hideAchievement (bool): True if achievements is hidden. False otherwise.

    Returns:
        uid (str): user Id of the user
    """
    user = findUser("uid", uid, db)
    user.update(
        {
            "achievementHidden": hideAchievement,
        }
    )   
    
    return uid
        