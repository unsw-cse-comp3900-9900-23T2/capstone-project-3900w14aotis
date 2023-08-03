from src.serverHelper import findUser

def updateProfile(uid,db, item):
    """
    This function updates the profile of a user in firebase auth and database

    Args:
        uid (str): user ID of the user
        db (): database
        item (body): item containing details of the taskMaster including
            firstName,lastName, email, profileImage, coverProfileImage

    Returns:
        uid (str): user ID of the user
    """
    user = findUser("uid", uid, db)
    user.update(
        {
        "firstName": item.firstName,
        "lastName": item.lastName,
        "email": item.email,
        "profileImage": item.profileImage,
        "coverProfileImage":item.coverProfileImage      
        }   
    )

    return uid