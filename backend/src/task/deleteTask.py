from src.serverHelper import findUser
from google.cloud import firestore

def taskRemove(projectId,taskId,db):
    """removes task from projects and removes task ID from assignees

    Args:
        projectId (Str): project id 
        taskId (Str): task id
        db (_type_): database
    
    Returns:
        taskId(str): task id  
    """
    projectRef = db.collection("projects").document(projectId)
    taskRef = projectRef.collection("tasks").document(taskId)
    doc = taskRef.get()
    assigneeList = doc.get("Assignees")
    #for each assignee in the task, remove the task id from their corresponding user docs
    for assignee in assigneeList:
        user = findUser("email",assignee,db)
        user.update(
            {"tasks": firestore.ArrayRemove([taskId])}
        )


    # remove task from projects collection
    projectRef.collection("tasks").document(taskId).delete()
    return taskId

