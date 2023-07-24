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
            "email": item.email.lower(),
            "uid": item.uid,
            "tasks": item.tasks,
            "projects": item.projects,
            "connectedTo": item.connectedTo,
            "pendingConnections": item.pendingConnections,
            "profileImage": item.profileImage,
            "coverProfileImage": item.coverProfileImage,
            "achievementHidden": item.achievementHidden,
        }
    )

    parentDocRef = db.collection("achievements").document(item.uid)
    achievementCollection = parentDocRef.collection("achievements")
    # Initialise innovator achievement
    achievementCollection.add(
        {
            "achievement": "Innovator",
            "description": "Create your first task",
            "target": 1,
            "currentValue": 0,
            "status": "In Progress",
        }
    )

    # Initialise New Critic achievement
    achievementCollection.add(
        {
            "achievement": "New Critic",
            "description": "Rate your first task",
            "target": 1,
            "currentValue": 0,
            "status": "In Progress",
        }
    )

    # Initialise Connoisseur achievement
    achievementCollection.add(
        {
            "achievement": "Connoisseur",
            "description": "Rate 5 tasks",
            "target": 5,
            "currentValue": 0,
            "status": "In Progress",
        }
    )

    # Initialise Task Fledgling achievement
    achievementCollection.add(
        {
            "achievement": "Task Fledgling",
            "description": "Complete First Task",
            "target": 1,
            "currentValue": 0,
            "status": "In Progress",
        }
    )

    # Initialise Task Master achievement
    achievementCollection.add(
        {
            "achievement": "Task Master",
            "description": "Complete 5 tasks",
            "target": 5,
            "currentValue": 0,
            "status": "In Progress",
        }
    )

    token = signInWithEmailAndPassword(email=item.email, password=item.password)

    return token
