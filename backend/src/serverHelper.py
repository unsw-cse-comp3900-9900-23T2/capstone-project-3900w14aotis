from fastapi import HTTPException
"""
This files contains helper functions that will help modularise 
"""


def findUser(queryField, queryValue, db):
    """
    Finds the user given any field in taskmasters, and the value of that field.
    i.e. "uid" or "email" will help find the user with that information.

    Args:
        queryField (str): string containing the field you will use to find the user
        queryValue (str): containing the value of the field
        db: database for the taskmasters.

    Returns:
        taskmasterRef: reference to the taskmaster's doc
    """
    docs = (
        db.collection("taskmasters")
        .where(queryField, "==", queryValue)
        .limit(1)
        .stream()
    )
    docId = ""
    for doc in docs:
        docId = doc.id
    taskmasterRef = db.collection("taskmasters").document(docId)
    return taskmasterRef


def getUserDoc(queryField, queryValue, db):
    """
    Retrieves the user document given a field of the taskmaster and the info for that.

    Args:
        queryField (str): string containing the field you will use to find the user
        queryValue (str): containing the value of the field
        db: database for the taskmasters.

    Returns:
        userDict: user document returned as a dictionary
    """
    currUserRef = findUser(queryField, queryValue, db)
    userDict = {}
    userDoc = currUserRef.get()

    if userDoc.exists:
        userDict = userDoc.to_dict()
        return userDict
    else:
        return "User not found!"


def getFromUser(queryField, queryValue, infoField, db):
    """
    Retrieves the any of the user's information given 
    any relevant information about that user.

    Args:
        queryField (str): field that you have information for
                        (e.g. email, uid, first/last name) of a user
        queryValue (str): information for the field you declared
        info (str): information field that you want to extract
        db: database for the taskmasters.

    Returns:
        userInfo (str): user info you were looking for
    """
    userDict = getUserDoc(queryField, queryValue, db)
    userInfo = userDict.get(infoField)
    return userInfo


def getAchievement(db, achievementName, uid):
    """
    Finds the achievement according to achievement name

    Args:
        achievementName (str): name of the achievement, e.g. Innovator
        uid (str): user id
        db: database for the achievements
    Returns:
        achievement: achievement returned in the form of a stream containing 1 element
    """
    achievementDocRef = db.collection("achievements").document(uid)
    achievementCollection = achievementDocRef.collection("achievements")
    achievement = (
        achievementCollection.where("achievement", "==", achievementName)
        .limit(1)
        .stream()
    )

    return achievement


def getTaskRef(projectId, taskId, db):
    """
    Retrieves doc reference of the task.

    Args:
        projectId (str): project ID of the task you want to access
        taskId (str): task ID of the task you want to get.
        db: database for the tasks.

    Returns:
        taskRef: reference to task document
    """
    projectDocRef = db.collection("projects").document(projectId)
    taskDocRef = projectDocRef.collection("tasks").document(taskId)

    return taskDocRef

def getTaskDoc(projectId, taskId, db):
    """
    Gets task doc as a dictionary

    Args:
        projectId (str): ID of the project that the task is in
        taskId (str): ID of the task you want to get the dictionary document of
        db: database for the tasks.

    Raises:
        HTTPException: 404 if the document does not exist

    Returns:
        taskDict: dictionary form of the document you wanted
    """
    taskRef = getTaskRef(projectId, taskId, db)
    taskDict = {}
    doc = taskRef.get()
    
    if doc.exists:
        taskDict = doc.to_dict()
    else: 
        raise HTTPException(
            status_code=404,
            detail={"code": "404", "message": "Task doesn't exist"},
        )
    return taskDict

def isValidUser(queryField, queryValue, db):
    """
    Checks if user is valid given any information of a user.

    Args:
        queryField (str): field for the information you have
        queryValue (str): information you have of the user
        db: database for the taskmasters.

    Returns:
        bool: returns True if a user exists with that, or False otherwise
    """
    docs = db.collection("taskmasters").where(queryField, "==", queryValue).stream()

    for doc in docs:
        if doc.exists:
            return True
    return False

def getProjectID(taskId, db):
    """
    Gets project ID given a taskId.
    Args:
        taskId (str): taskId of the task you want to find the project of
        db (str): database
    Returns:
        projectId (str): project ID of the task you were looking for
    """
    projects = db.collection("projects").stream()
    for project in projects:
        tasks = db.collection("projects").document(project.id).collection('tasks').stream()
        for task in tasks:
            if task.id == taskId:
                return project.id
