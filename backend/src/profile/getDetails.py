def getProfDetails(uid,db):
    """gets user details given a user id (email, firstname, lastname,uid, tasks, projects)

    Args:
        uid (str): user id
        db (_type_): database

    Returns:
        profDetails(dict): dictionary containing user details
    """
    profDetails = {}
    docs = db.collection("taskmasters").where("uid", "==",uid).limit(1).stream()
    for doc in docs:
        profDetails = doc.to_dict()

    return profDetails

