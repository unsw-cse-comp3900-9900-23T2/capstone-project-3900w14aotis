from src.task.getTaskDetails import makeAssigneeList
from google.cloud import firestore

"""
This file contains helper functions to get a list of tasks within a project.
"""


def listTasks(projectId, db):
    parentDocId = projectId
    subCollection = "tasks"
    parentDocRef = db.collection("projects").document(parentDocId)
    taskList = []
    taskCollection = parentDocRef.collection(subCollection).stream()
    for task in taskCollection:
        taskDict = task.to_dict()
        assigneeList = taskDict.pop("Assignees")
        assigneeDictList = makeAssigneeList(db, assigneeList)
        taskDict["taskID"] = task.id
        taskDict["Assignees"] = assigneeDictList
        taskList.append(taskDict)

    return taskList


def listPaginatedTasks(projectId, latestTaskId, db):
    # print(latestTaskId)
    parentDocId = projectId
    parentDocRef = db.collection("projects").document(parentDocId)
    taskCollectionRef = parentDocRef.collection("tasks")
    # sortedTaskQuery = taskCollectionRef.order_by("CreationTime").limit(5)
    # docs = sortedTaskQuery.stream()
    # lastDoc = list(docs)[-1]

    countQuery = taskCollectionRef.count()
    queryResult = countQuery.get()
    count = queryResult[0][0].value

    # lastTask = lastDoc.to_dict()
    lastTaskRef = taskCollectionRef.document(latestTaskId)
    lastDocTask = lastTaskRef.get()
    lastTask = lastDocTask.to_dict()

    # print(lastTask)
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

    print(taskList)

    return {"taskList": taskList, "numTasks": count}
