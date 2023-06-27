from google.cloud import firestore

"""
This creates a new project for the user to add tasks to.
"""

def createNewProject(project, db):
    """
    The user that creates the project is automatically added to the project.
    Args:
        ?user id (str): reference ID of user creating task

    Returns:

    """
    projectRef = db.collection('projects').add({
        "title": project.title,
        "members": [
            project.user
        ]
    })
    #TODO: add to taskmasters database too


    return projectRef

def joinExistingProject(project, projectId, db):
    """Joins an existing project with the given ID.

    Args:
        project (class JoinProject): contains an id and user
        db (_type_): connection to firebase database
    """
    parentDocRef = db.collection("projects").document(projectId)

    # TODO: append to members list instead of replace
    resp = parentDocRef.update({
        "members": [
            project.user
        ]
    })



    #TODO: add to taskmasters database too
    return resp