from src.task.getTaskDetails import makeAssigneeList
from src.serverHelper import getTaskDoc

"""
This file contains helper functions to get a list of tasks within a project.
"""

def listTasks(projectId, db):
    """
    Lists the tasks of a project given project Id

    Args:
        projectId (str): project Id
        db: database for the taskmasters.

    Returns:
        taskList: user document returned as a dictionary
    """
    parentDocRef = db.collection("projects").document(projectId)
    taskCollection = parentDocRef.collection("tasks").stream()

    taskList = []
    for task in taskCollection:
        taskDict = task.to_dict()
        assigneeList = taskDict.pop("Assignees")
        assigneeDictList = makeAssigneeList(db, assigneeList)
        taskDict["taskID"] = task.id
        taskDict["Assignees"] = assigneeDictList
        taskList.append(taskDict)

    return taskList


def listPaginatedTasks(projectId, latestTaskId, db):
    """
    Lists the paginated tasks of a project given project Id

    Args:
        projectId (str): project Id
        latestTaskId (str): latest task Id
        db: database for the taskmasters.

    Returns:
        taskList: user document returned as a dictionary
    """
    parentDocRef = db.collection("projects").document(projectId)
    taskCollectionRef = parentDocRef.collection("tasks")

    countQuery = taskCollectionRef.count()
    queryResult = countQuery.get()
    count = queryResult[0][0].value

    lastTask = getTaskDoc(projectId, latestTaskId, db)
        
    if latestTaskId == "initialise":
        nextQuery = taskCollectionRef.order_by("CreationTime").limit(5)
    else:
        nextQuery = (
            taskCollectionRef.order_by("CreationTime").start_after(lastTask).limit(5)
        )
    sortedTaskCollection = nextQuery.stream()

    taskList = []  
    
    for task in sortedTaskCollection:
        taskDict = task.to_dict()
        assigneeList = taskDict.pop("Assignees")
        assigneeDictList = makeAssigneeList(db, assigneeList)
        taskDict["taskID"] = task.id
        taskDict["Assignees"] = assigneeDictList
        taskList.append(taskDict)

    return {"taskList": taskList, "numTasks": count}
