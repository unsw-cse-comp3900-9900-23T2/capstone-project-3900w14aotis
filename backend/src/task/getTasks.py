"""
This file contains helper functions to get a list of tasks within a project.
"""


def listTasks(projectId,db):

    parentDocId = projectId
    subCollection = "tasks"
    parentDocRef = db.collection("projects").document(parentDocId)
    taskList = []
    taskCollection = parentDocRef.collection(subCollection).stream()
    for task in taskCollection: 
        taskDict = task.to_dict()
        taskDict["taskID"] = task.id
        taskList.append(taskDict)
    
    return taskList




