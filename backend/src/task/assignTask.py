"""
This files contains helper functions to help assign a task to any taskmaster
"""

def addTaskAssignee(projectId, taskId, userId, db):
    """
    This function takes in the ID of the task that you want to assign to, the person you want to assign
    to that task. This adds the task to the taskmaster's list of tasks

    Args:
        taskId (str): ID for the task that you want to assign someone to
        projectId (str): ID for the project that the task is in 
        db: database connection
    
    
    """

def deleteTaskAssignee(taskId, userId, db):
