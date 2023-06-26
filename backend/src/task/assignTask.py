from firebase_admin import firestore
"""
This files contains helper functions to help assign a task to any taskmaster
"""

def addAssignee(projectId, taskId, userId, db):
    """
    This function takes in the ID of the task that you want to assign to, the person you want to assign
    to that task. This adds the task to the taskmaster's list of tasks

    Args:
        projectId (str): ID for the project that the task is in 
        taskId (str): ID for the task that you want to assign someone to
        db: database connection
    
    
    """
    projectRef = db.collection('projects').document(projectId)
    taskRef = projectRef.collection('tasks').document(taskId)

    taskRef.update({"assignee(s)": firestore.ArrayUnion([userId])})

    return userId

def deleteAssignee(projectId, taskId, userId, db):
    return