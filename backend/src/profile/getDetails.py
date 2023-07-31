from src.serverHelper import getUserDoc
def getProfDetails(uid, db):
    """
    Gets user details given a user id (email, firstname, lastname, uid, tasks, projects)

    Args:
        uid (str): user id of the user
        db (_type_): database

    Returns:
        profDetails(dict): dictionary containing user details
    """
    profDetails = getUserDoc("uid", uid, db)

    return profDetails
