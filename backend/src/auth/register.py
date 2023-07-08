from src.config.firestoreUtils import initialiseFirestore
from src.config.firestoreUtils import auth
from src.auth.login import signInWithEmailAndPassword


# authRegister takes in 2 parameters, item (representing the taskMaster class) and db(the database). It
# creates the user in the authentication section and also adds a new document representing the user in the
# firebase data (includes authentication uid)
def authRegister(item, db):
    """_summary_

    Args:
        item (_type_): _description_
        db (_type_): _description_

    Returns:
        _type_: _description_
    """

    db.collection("taskmasters").add(
        {
            "firstName": item.firstName,
            "lastName": item.lastName,
            "email": item.email,
            "uid": item.uid,
            "tasks": item.tasks,
            "projects": item.projects,
            "connectedTo": item.connectedTo,
            "pendingConnections": item.pendingConnections,
            "profileImage": item.profileImage,
            "coverProfileImage": item.coverProfileImage,
        }
    )
    token = signInWithEmailAndPassword(email=item.email, password=item.password)

    return token
