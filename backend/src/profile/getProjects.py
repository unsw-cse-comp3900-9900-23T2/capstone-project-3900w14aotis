from src.serverHelper import getFromUser
def userProjects(uid, db):
    """
    Returns a list of project ids given a user id

    Args:
        uid (str): user id of the user
        db (_type_): database

    Returns:
        projectList: list of project ids
    """
    projectList = getFromUser("uid", uid, "projects", db)
    
    return projectList