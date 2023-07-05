
"""
This file contains helper functions to get a list of tasks within a project.
"""
def userTasks(uid, db):
    """_summary_

    Args:
        uid (_type_): user Id
        db (_type_): database

    Returns:
        _type_: full details of the tasks given a user id
    """
    taskList = []
    docs = db.collection("taskmasters").where("uid", "==",uid).limit(1).stream()

    for doc in docs:
        taskList = doc.get("tasks")

    taskListDoc = []
    parentDocRef = db.collection("projects").get()

    for project in parentDocRef:
        taskDocRef = db.collection("projects").document(project.id).collection("tasks").get()
        for task in taskDocRef:  
            if task.id in taskList:
                taskDict = task.to_dict()
                taskDict["taskID"] = task.id      
                taskListDoc.append(taskDict)
    

    return taskListDoc




    


