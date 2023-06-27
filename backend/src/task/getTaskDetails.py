"""
This files contains helper functions to help retrieve details of a task
"""

def getDetails(projectId, taskId, db):
    """
    Get all the details of a task.

    Args:
        projectId (str): reference id of the project the task is in
        taskId (str): reference id of desired task
        db: database connection

    Returns:
        doc (dict): dictionary containing the details of the doc
    """
    projectDocRef = db.collection('projects').document(projectId)
    taskDocRef = projectDocRef.collection('tasks').document(taskId)

    doc = taskDocRef.get()
    if doc.exists:
        return doc.to_dict()
    else:
        return "No document found!"

    