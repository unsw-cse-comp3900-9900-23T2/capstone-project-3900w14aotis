from src.auth.login import signInWithEmailAndPassword
from src.serverHelper import convertImageToBase64

INITIAL_WORKLOAD = float()

# authRegister takes in 2 parameters, item (representing the taskMaster class) and db(the database). It
# creates the user in the authentication section and also adds a new document representing the user in the
# firebase data (includes authentication uid)
def authRegister(item, db):
    """
    Registers a person given information from the user.

    Args:
        item (TaskMaster): contains information for a taskmaster
        db: database

    Returns:
        token: login token as registering logs the person in too
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
            "workload": INITIAL_WORKLOAD,
            "achievementHidden": False,
            "Rating": {
                "Very Happy": [],
                "Happy": [],
                "Neutral": [],
                "Sad": [],
                "Very Sad": [],
            },
        }
    )

    parentDocRef = db.collection("achievements").document(item.uid)
    achievementCollection = parentDocRef.collection("achievements")
    # Initialise innovator achievement
    addAchievement("Innovator","Create your first task",1,0,"In Progress","./src/auth/images/innovatorImage.png",achievementCollection)
    # Initialise New Critic achievement
    addAchievement("New Critic","Rate your first task",1,0,"In Progress","./src/auth/images/newCriticImage.png",achievementCollection)
    # Initialise Connoisseur achievement
    addAchievement("Connoisseur","Rate 5 tasks",5,0,"In Progress","./src/auth/images/connoisseurImage.png",achievementCollection)
    # Initialise Task Fledgling achievement
    addAchievement("Task Fledgling","Complete First Task",1,0,"In Progress","./src/auth/images/taskFledglingImage.jpg",achievementCollection)
    # Initialise Task Master achievement
    addAchievement("Task Master","Complete 5 tasks",5,0,"In Progress","./src/auth/images/taskMasterImage.png",achievementCollection)
    # Initialise Task Wizard achievement
    addAchievement("Task Wizard","Complete 100 tasks",100,0,"In Progress","./src/auth/images/taskWizardImage.png",achievementCollection)
    # Initialise Social Butterfly achievement
    addAchievement("Social Butterfly","Send your first connection",1,0,"In Progress","./src/auth/images/socialButterflyImage.png",achievementCollection)
    # Initialise BNOC achievement
    addAchievement("BNOC","Send 5 connections",5,0,"In Progress","./src/auth/images/bnocImage.png",achievementCollection)

    token = signInWithEmailAndPassword(email=item.email, password=item.password)

    return token

def addAchievement(achievement, description, target, currentValue, status, image, achievementCollection):  
    """
    Adds an achievement into the database given details of the achievement

    Args:
        achievement (str): title of the achievement you are creating
        description (str): description of achievement
        target (int): completion target for achievement
        currentValue (int), current value of the achievement towards target
        status (str): status of the progression for the achievement, in progress and done
        image (str): path of image 
        achievementCollection(): collection of achievement to write into

    """


    achievementCollection.add(
        {
            "achievement": achievement,
            "description": description,
            "target": target,
            "currentValue": currentValue,
            "status": status,
            "image": convertImageToBase64(image) 
        }
    )
    return