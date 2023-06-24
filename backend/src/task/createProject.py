"""
This creates a new project for the user to add tasks to.
"""

def createNewProject(projectTitle, db):
    """
    The user that creates the project is automatically added to the project.
    Args:
        ?user id (str): reference ID of user creating task

    Returns:

    """
    projectRef = db.collection('projects').add({
        "title": projectTitle
    })

    return projectRef
