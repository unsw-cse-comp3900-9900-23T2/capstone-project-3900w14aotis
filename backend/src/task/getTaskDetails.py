from fastapi import HTTPException
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
    projectDocRef = db.collection("projects").document(projectId)
    taskDocRef = projectDocRef.collection("tasks").document(taskId)
    taskDict = {}
    doc = taskDocRef.get()

    if doc.exists:
        taskDict = doc.to_dict()
    else:
        raise HTTPException(
            status_code=404,
            detail={"code": "404", "message": "Document doesn't exist"},
        )

    assigneeList = taskDict.pop("Assignees")
    assigneeDictList = makeAssigneeList(db, assigneeList)
    taskDict["Assignees"] = assigneeDictList
    return taskDict


def makeAssigneeList(db, list):
    assigneeDictList = []
    for assignee in list:
        assigneeDetail = getProfDetails(assignee, db)
        assigneeDictList.append(assigneeDetail)
    return assigneeDictList


def getProfDetails(email, db):
    """gets user details given a email (email, firstname, lastname,uid, tasks, projects)

    Args:
        email (str): _description_
        db (_type_): database

    Returns:
        profDetails(dict): dictionary of the profiles details
    """
    profDetails = {}
    docs = (
        db.collection("taskmasters")
        .where("email", "==", email.lower())
        .limit(1)
        .stream()
    )
    for doc in docs:
        profDetails = doc.to_dict()

    return profDetails
