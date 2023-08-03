from src.serverHelper import findUser

def userRatings(uid, db):
    """
    Gets the all ratings of a user

    Args:
        uid (str): user id of the user
        db (_type_): database

    Returns:
        ratingDict: Dictionary containing all ratings a user has given
    """
    ratingDict = {
        "Very Happy": 0,
        "Happy": 0,
        "Neutral": 0,
        "Sad": 0,
        "Very Sad": 0,
    }

    userRef = findUser("uid",uid,db)
    userRatingDict = userRef.get().get("Rating")
    for task in userRatingDict:
        ratingDict[task] += len(userRatingDict[task])


    return ratingDict

