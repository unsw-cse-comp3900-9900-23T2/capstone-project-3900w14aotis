

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