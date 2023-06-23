"""
This file contains helper functions to create a new task within a project.
"""

def createNewTask(newTask, projectId, db):
    """
    This takes in the details of the new task to be added including a title,
    description, deadline, and assignee as well as a project ID to add the task to.
    Args:
        newTask (Task): title, description, deadline, assignee
        projectId (string): reference ID of the project
        db : database connection
    
    Returns:
        obj: this contains the document reference number if succesfully added
    """
    parentDocId = projectId
    subCollection = 'tasks'
    parentDocRef = db.collection('projects').document(parentDocId)


    taskRef = parentDocRef.collection(subCollection).add({
        "title": newTask.title,
        "description": newTask.description,
        "deadline": newTask.deadline,
        "assignee": newTask.assignee
    })

    return taskRef
