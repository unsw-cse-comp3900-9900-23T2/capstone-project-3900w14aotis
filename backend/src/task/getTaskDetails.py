from src.serverHelper import getTaskDoc, getUserDoc
"""
This file contains helper functions to help retrieve details of a task
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
    taskDict = getTaskDoc(projectId, taskId, db)
    assigneeList = taskDict.pop("Assignees")
    assigneeDictList = makeAssigneeList(db, assigneeList)
    taskDict["Assignees"] = assigneeDictList
    return taskDict


def makeAssigneeList(db, assigneeList):
    """
    Creates an assignee list with all the details of those assignees

    Args:
        db: database connection
        list (List): list of assignee emails

    Returns:
        assigneeDictList (List): list of dictionaries containing assignee details
    """
    assigneeDictList = []
    for email in assigneeList:
        assigneeDetail = getUserDoc("email", email, db)
        assigneeDictList.append(assigneeDetail)
    return assigneeDictList
