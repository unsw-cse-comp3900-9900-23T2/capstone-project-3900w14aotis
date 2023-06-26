from google.cloud import firestore
"""
This files contains helper functions to help assign a task to any taskmaster
"""

def addAssignee(projectId, taskId, userId, db):
    """
    This function assigns the task to a taskmaster

    Args:
        projectId (str): ID for the project that the task is in 
        taskId (str): ID for the task that you want to assign someone to
        userId (str): ID for the person you want to assign
        db: database connection
    
    
    """
    projectRef = db.collection('projects').document(projectId)
    taskRef = projectRef.collection('tasks').document(taskId)

    # above this is fine

    taskRef.update({"assignee(s)": firestore.ArrayUnion(["john"])})

    # note: update taskmaster's task list too

    return userId

def deleteAssignee(projectId, taskId, userId, db):
    """
    This function deletes an assignee from a task

    Args:
        projectId (str): ID for the project that the task is in 
        taskId (str): ID for the task that you want to remove someone from
        userId (str): ID for the person you want to remove
        db: database connection
    
    
    """
    projectRef = db.collection('projects').document(projectId)
    taskRef = projectRef.collection('tasks').document(taskId)

    taskRef.update({"Assignees": firestore.ArrayRemove([userId])})

    # note: update taskmaster's task list too

    return userId
