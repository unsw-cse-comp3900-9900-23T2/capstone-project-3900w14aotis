from src.serverHelper import getAchievement,findUser

def updateTask(projectId,taskId,db, item):
    """Update task details given project and task Id

    Args:
        projectId (str): project Id
        taskId (str): task Id
        db (_type_): database
        item (body): update body

    Returns:
        taskId(str): taskId
    """
    projectDocRef = db.collection("projects").document(projectId)
    taskDocRef = projectDocRef.collection("tasks").document(taskId)
    taskDict = {
        "TaskID": taskId,
        "Task Fledgling": "In Progress",
    }
    #Check if user is part of the task's assignee list
    userRef = findUser("uid",item.creatorId,db)
    userEmail = userRef.get().get("email")
    # If user isnt part of task, return none
    assigneeList = taskDocRef.get().get("Assignees")
    if userEmail not in assigneeList:
        return None
    

    #If Task Fledgling Achievement is in progress, mark as done
    achievementDoc = getAchievement(db, "Task Fledgling",item.creatorId)
    for achievement in achievementDoc:
        if (achievement.get("status") == "In Progress") and (item.status == "Done"):
            achievement.reference.update(
                {
                "currentValue": 1,
                "status": "Done",
                }
            )
        taskDict["Task Fledgling"] = "Done"


    taskDocRef.update(
        {
        "Title": item.title,
        "Description": item.description,
        "Deadline": item.deadline,
        "Priority": item.priority,
        "Status":item.status
        }
    )
    return taskDict