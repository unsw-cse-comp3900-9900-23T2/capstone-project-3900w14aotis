from src.config.firestoreUtils import auth



def updateProfile(uid,db, item):
    """
    This function updates the profile of a user in firebase auth and database

    Args:
        uid (str): user ID
        db (): database
        item (body): item containing details of the taskMaster including
            firstName,lastName, email, profileImage, coverProfileImage

    Returns:
        (str): user ID
    """
    
    docs = db.collection("taskmasters").where("uid", "==",uid).limit(1).stream()
    for doc in docs:
        doc.reference.update(
             {
            "firstName": item.firstName,
            "lastName": item.lastName,
            "email": item.email,
            "profileImage": item.profileImage,
            "coverProfileImage":item.coverProfileImage
            }
        )

        

    return uid