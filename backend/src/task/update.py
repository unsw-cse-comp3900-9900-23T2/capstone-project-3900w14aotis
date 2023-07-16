from src.serverHelper import getAchievement

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
    # achievementDoc = getAchievement(db, "Task Fledgling",item.creatorId)
    # for achievement in achievementDoc:
    #     if (achievement.get("status") == "In Progress") and (item.status == "Done"):
    #         achievement.reference.update(
    #             {
    #             "currentValue": 1,
    #             "status": "Done",
    #             }
    #         )






    projectDocRef = db.collection("projects").document(projectId)
    taskDocRef = projectDocRef.collection("tasks").document(taskId)
    taskDocRef.update(
        {
        "Title": item.title,
        "Description": item.description,
        "Deadline": item.deadline,
        "Priority": item.priority,
        "Status":item.status
        }
    )
    return taskId