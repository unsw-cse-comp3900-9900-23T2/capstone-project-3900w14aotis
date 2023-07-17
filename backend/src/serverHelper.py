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


def getUserId(queryField, queryValue, db):
    """
    Retrieves the user's ID given any relevant information about that user.

    Args:
        queryField (str): field that you have information for
                        (e.g. email, uid, first/last name) of a user
        queryValue (str): information for the field you declared
        db : database
    """
    userDict = getUserDoc(queryField, queryValue, db)
    userId = userDict.pop("uid")
    return userId

def getTaskRef(projectId, taskId, db):
    """
    Retrieves doc reference of the task.

    Args:
        projectId (str): project ID of the task you want to access
        taskId (str): task ID of the task you want to get.
        db: database used
    """
    projectDocRef = db.collection("projects").document(projectId)
    taskDocRef = projectDocRef.collection("tasks").document(taskId)

    return taskDocRef

def getTaskDoc(projectId, taskId, db):
    """
    Retrieves doc (in dictionary form) of the task.

    Args:
        projectId (str): project ID of the task you want to access
        taskId (str): task ID of the task you want to get.
        db: database used
    """
    projectDocRef = db.collection("projects").document(projectId)
    taskDocRef = projectDocRef.collection("tasks").document(taskId)
    taskDict = {}
    doc = taskDocRef.get()

    if doc.exists:
        taskDict = doc.to_dict()
    else:
        return "No document found!"
    
    return taskDict

# EXPERIMENTAL
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
        tasks = db.collection("projects").document(project).collection('tasks').stream()
        for task in tasks:
            if task.id == taskId:
                return project