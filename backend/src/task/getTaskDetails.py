"""
This files contains helper functions to help retrieve details of a task
"""

def getDetails(projectId, taskId, db):
    """
    Get all the details of a task.

    Args:
        projectId (str): reference id of the project the task is in
        taskId (str): reference id of desired task
        db: database connection

    Returns:
        doc (dict): dictionary containing the details of the doc
    """
    projectDocRef = db.collection('projects').document(projectId)
    taskDocRef = projectDocRef.collection('tasks').document(taskId)
    taskDict = {}
    doc = taskDocRef.get()

    if doc.exists:
        taskDict = doc.to_dict()
    else:
        return "No document found!"
    
    assigneeList = taskDict.pop("Assignees")
    assigneeDictList = []
    for assignee in assigneeList:
        assigneeDetail = getProfDetails(assignee,db)
        assigneeDictList.append(assigneeDetail)

    taskDict["Assignees"] = assigneeDictList

    return taskDict



def getProfDetails(email,db):
    """gets user details given a user id (email, firstname, lastname,uid, tasks, projects)

    Args:
        uid (str): user id
        db (_type_): database

    Returns:
        profDetails(dict): dictionary containing user details
    """
    profDetails = {}
    docs = db.collection("taskmasters").where("email", "==",email).limit(1).stream()
    for doc in docs:
        profDetails = doc.to_dict()

    return profDetails

    