

def taskRemove(projectId,taskId,db):
    """removes task from projects and removes task ID from assignees

    Args:
        projectId (_type_): _description_
        taskId (_type_): _description_
        db (_type_): _description_
    """
    projectRef = db.collection("projects").document(projectId)
    taskRef = projectRef.collection("tasks").document(taskId)
    doc = taskRef.get()
    assigneeList = doc.get("Assignees")
    for assignee in assigneeList:
        
    # remove task from projects collection
    projectRef.collection("tasks").document(taskId).delete()

