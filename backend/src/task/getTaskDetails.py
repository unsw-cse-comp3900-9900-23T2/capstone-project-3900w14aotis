"""
This files contains helper functions to help retrieve details of a task
"""

def getTaskDetails(projectId, taskId, db):
    """
    Get all the details of a task.

    Args:
        projectId (str): reference id of the project the task is in
        taskId (str): reference id of desired task
        db: database connection

    Returns:
        doc (dict): dictionary containing the details of the doc
    """
    doc_ref = db.collection(projectId).document(taskId)
    doc = doc_ref.get()

    return doc.to_dict()