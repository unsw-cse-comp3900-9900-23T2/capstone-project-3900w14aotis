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
    # Add project to taskmaster database
    docs = db.collection("taskmasters").where("uid", "==", project.user).limit(1).stream()
    docId = ""
    for doc in docs:
        docId = doc.id
    db.collection("taskmasters").document(docId).update({
        "projects": firestore.ArrayUnion([projectRef[1].id])
    })


    return projectRef

def joinExistingProject(project, projectId, db):
    """Joins an existing project with the given ID.

    Args:
        project (class JoinProject): contains an id and user
        db (_type_): connection to firebase database
    """
    parentDocRef = db.collection("projects").document(projectId)

    # Update members in projects database
    resp = parentDocRef.update({
        "members": firestore.ArrayUnion([project.user])
    })

    # Add project to taskmaster database
    docs = db.collection("taskmasters").where("uid", "==", project.user).limit(1).stream()
    docId = ""
    for doc in docs:
        docId = doc.id
    db.collection("taskmasters").document(docId).update({
        "projects": firestore.ArrayUnion([projectId])
    })

    return resp