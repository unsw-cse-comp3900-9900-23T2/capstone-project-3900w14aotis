def userProjects(uid, db):
    """returns a list of project ids given a user id

    Args:
        uid (str): user id
        db (_type_): database

    Returns:
        projectList: list of project ids
    """
    projectList = []
    parentdocRef = db.collection("taskmasters").where("uid", "==",uid).limit(1).stream()
    for doc in parentdocRef:
        projectList = doc.get("projects")
    
    return projectList