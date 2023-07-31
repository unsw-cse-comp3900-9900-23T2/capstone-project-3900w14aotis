from src.serverHelper import getFromUser
"""
This file contains helper functions to get a list of tasks within a project.
"""
def userTasks(uid, db):
    """
    Gets all tasks of a user

    Args:
        uid (str): user Id of the user
        db: database

    Returns:
        taskListDoc: full details of the tasks given a user id
    """
    taskList = getFromUser("uid", uid, "tasks", db)

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




    


