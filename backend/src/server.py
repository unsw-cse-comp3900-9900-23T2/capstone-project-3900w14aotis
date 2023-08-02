from src.config.firestoreUtils import initialiseFirestore
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from src.auth.register import authRegister
from src.auth.login import authLogin
from datetime import datetime
from src.task.createTask import createNewTask
from src.task.createProject import createNewProject
from src.task.getTasks import listTasks, listPaginatedTasks
from src.task.createProject import joinExistingProject
from fastapi.middleware.cors import CORSMiddleware
from src.task.assignTask import addAssignee
from src.task.assignTask import deleteAssignee
from src.task.getTaskDetails import getDetails
from src.task.deleteTask import taskRemove
from src.task.update import updateTask
from src.profile.update import updateProfile
from src.profile.getTasks import userTasks
from src.profile.getProjects import userProjects
from src.profile.getRatings import userRatings
from src.profile.getDetails import getProfDetails
from src.profile.checkAchievements import checkAchievement
from src.profile.setAchievements import setAchievement
from src.achievement.getAchievements import listAchievements
from src.connections.sendConnection import sendConnection
from src.connections.connectionRespond import acceptConnection, declineConnection
from src.connections.getConnections import getConnections
from src.connections.connectionHelper import isRequestPending, isConnectedTo
from src.rating.addRating import addRating
from src.connections.connectionRemove import unfriend
from src.workload.calculateWorkload import getWorkloadValue

db = initialiseFirestore()
app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TaskMaster(BaseModel):
    uid: str
    firstName: str
    lastName: str
    password: str
    email: str
    tasks: list[str]
    projects: list[str]
    connectedTo: list[str]
    pendingConnections: list[str]
    profileImage: str
    coverProfileImage: str

class LoginBody(BaseModel):
    email: str
    password: str

class Task(BaseModel):
    title: str
    description: str
    deadline: datetime
    assignees: list[str]
    priority: str
    status: str
    creationTime: datetime
    creatorId: str

class NewProject(BaseModel):
    title: str
    user: str

class Assignee(BaseModel):
    projectId: str
    taskId: str
    email: str
    currUser: str

class JoinProject(BaseModel):
    user: str

class UpdateBody(BaseModel):
    firstName: str
    lastName: str
    email: str
    profileImage: str
    coverProfileImage: str

class UpdateTask(BaseModel):
    title: str
    description: str
    deadline: datetime
    priority: str
    status: str
    creatorId: str

class TaskRatingBody(BaseModel):
    projectId: str
    taskId: str
    mood: str


@app.post("/auth/register", summary="Registers a user in the application")
async def register(item: TaskMaster):
    """
    Given a taskMaster class, create a new document representing
    the user whilst also adding a slot in the authentication section of firebase. Returns the
    json payload with token

    Args:
        item (taskMaster): body containing uid,firstName,lastName,password,email,tasks,projects,connectedTo
        pendingConnections,profileImage,coverProfileImage

    Returns:
        token: json payload with token (essentially the auth token)
    """
    try:
        token = authRegister(item, db)
        return {"detail": {"code": 200, "message": token}}
    except:
        raise HTTPException(
            status_code=404, detail={"code": "404", "message": "Error registering user"}
        )


@app.post("/auth/login", summary="Logs a user in the application")
async def login(item: LoginBody):
    """
    This function authorises a user in firebase auth when
    the /auth/login route is called.

    Args:
        item (loginBody): body containing an email and password

    Returns:
        (obj) : result object returned by firebase auth
    """
    try:
        result = authLogin(item, db)
        return result
    except:
        raise HTTPException(
            status_code=404, detail={"code": "404", "message": "Error logging in user"}
        )


@app.post("/task/create/{projectId}", summary="Create a new task")
async def createTask(task: Task, projectId: str):
    """
    This function creates a new task for a taskmaster in the
    given project.

    Args:
        task (Task): task body containing title,description,deadline,assignees,priority,status,creationTime 
        and creatorId

    Returns:
        taskId (str): Id of the created task
    """
    try:
        taskId = createNewTask(task, projectId, db)
        return {
            "detail": {
                "code": 200,
                "message": f"Task {taskId} created successfully",
            }
        }
    except:
        raise HTTPException(
            status_code=404,
            detail={"code": "404", "message": "Error creating a new task"},
        )


@app.post("/project/create", summary="Create a new project")
async def createProject(item: NewProject):
    """
    This function creates a new project so that taskmasters have a collaborative space
    to add tasks to.
    Args:
        newProject (NewProject): project body containing title and user

    Returns:
        projectId (str): Id of the created project
    """
    try:
        projectId = createNewProject(item, db)
        return {
            "detail": {
                "code": 200,
                "message": f"{projectId[1].id}",
            }
        }
    except:
        raise HTTPException(
            status_code=404,
            detail={"code": "404", "message": "Error creating a new project"},
        )


@app.get("/task/{projectId}/{taskId}/get", summary="Get details of a task")
async def getTaskDetails(projectId: str, taskId: str):
    """
    gets the details of a task

    Args:
        projectId (str): project id
        taskId (str): task id

    Returns:
        taskDetails(dict): dictionary of task details
    """
    try:
        taskDetails = getDetails(projectId, taskId, db)
        return {"detail": {"code": 200, "message": taskDetails}}
    except HTTPException as e:
        if e.status_code == 404 and e.detail == {
            "code": "404",
            "message": "Document doesn't exist",
        }:
            raise
        else:
            raise HTTPException(
                status_code=404,
                detail={
                    "code": "404",
                    "message": "Error retrieving data from this task",
                },
            )


@app.get("/tasks/{projectId}", summary="Lists all tasks of given project")
async def getTasks(projectId: str):
    """
    get tasks of a project

    Args:
        projectId (str): project Id

    Returns:
        taskList: list of tasks including assignee details
    """
    try:
        taskList = listTasks(projectId, db)
        return {
            "detail": {
                "code": 200,
                "message": taskList,
            }
        }
    except:
        raise HTTPException(
            status_code=404,
            detail={"code": "404", "message": "Error getting tasks"},
        )


@app.get(
    "/tasks/{projectId}/{latestTaskId}", summary="Paginates the tasks of given project"
)
async def getPaginatedTasks(projectId: str, latestTaskId: str):
    """
    Get paginated tasks of a given project

    Args:
        projectId (str): project Id
        latestTaskId (str): latest task Id

    Returns:
        taskList: list of tasks including assignee details
    """
    try:
        taskDict = listPaginatedTasks(projectId, latestTaskId, db)
        return {
            "detail": {
                "code": 200,
                "message": taskDict,
            }
        }
    except:
        raise HTTPException(
            status_code=404,
            detail={"code": "404", "message": "Error getting tasks"},
        )


@app.post("/project/join/{projectId}", summary="Join a project")
async def joinProject(item: JoinProject, projectId: str):
    """
    Join a given project

    Args:
        item (JoinProject): joinProject body containing user id
        projectId (str): project Id
    
    Returns:
        projectId (str): Id of a project
    """
    try:
        response = joinExistingProject(item, projectId, db)
        return {
            "detail": {
                "code": 200,
                "message": projectId,
            }
        }
    except:
        raise HTTPException(
            status_code=404,
            detail={"code": "404", "message": "Error joining project"},
        )


@app.post("/task/addTaskAssignee", summary="Adds an assignee to a task")
async def addTaskAssignee(assignee: Assignee):
    """
    This function adds an assignee to the given task.

    Args:
        assignee (Assignee): assignee body containing projectId, taskId, email
        and currentUser

    Returns:
        assigned (str): string saying that the user is successfully added along with the
        user's email
    """
    try:
        assigned = addAssignee(
            assignee.projectId, assignee.taskId, assignee.email, assignee.currUser, db
        )
        return {
            "detail": {
                "code": 200, 
                "message": assigned
            }
        }
    
    except HTTPException as e:
        if e.status_code == 400:
            raise
        raise HTTPException(
            status_code=404,
            detail={"code": "404", "message": "Error assigning taskmaster"},
        )


@app.delete("/task/deleteTaskAssignee", summary="Removes an assignee from a task")
async def deleteTaskAssignee(assignee: Assignee):
    """
    This function removes an assignee from a task.

    Args:
        assignee (Assignee): assignee body containing projectId, taskId, email, and 
        currUser

    Returns:
        deleted (str): email of the deleted user
    """
    try:
        deleted = deleteAssignee(
            assignee.projectId, assignee.taskId, assignee.email, db
        )
        return {
            "detail": {
                "code": 200, 
                "message": f"User: {deleted} successfully removed"
            }
        }
    except:
        raise HTTPException(
            status_code=404,
            detail={"code": "404", "message": "Error removing taskmaster"},
        )


@app.delete("/task/delete/{projectId}/{taskId}", summary="Removes a task")
async def deleteTask(projectId: str, taskId: str):
    """
    This function removes a task from a project

    Args:
        projectId (str): ID for the project that the task is in
        taskId (str): ID for the task that you want to remove someone from

    Returns:
        deleted (str): taskId if it has been removed
    """
    try:
        deleted = taskRemove(projectId, taskId, db)
        return {
            "detail": {
                "code": 200, 
                "message": f"Task: {deleted} successfully removed"
            }
        }
    except:
        raise HTTPException(
            status_code=404,
            detail={"code": "404", "message": "Error removing task"},
        )


@app.post("/task/update/{projectId}/{taskId}", summary="Updates a tasks details")
async def updateTaskDetails(item: UpdateTask, projectId: str, taskId: str):
    """
    Update task details given project and task Id

    Args:
        item (UpdateTask): update body containing title, description, deadline, priority,status
        and creatorId

    Returns:
        taskDict (dict): dictionary containing the status of task related achievements
    """

    try:
        taskDict = updateTask(projectId, taskId, db, item)
        return {
            "detail": {
                "code": 200, 
                "message": taskDict
            }
        }

    except:
        raise HTTPException(
            status_code=404, detail={"code": "404", "message": "Error updating task"}
        )


@app.post("/profile/update/{uid}", summary="Updates a user's profile details")
async def updateProfileDetails(item: UpdateBody, uid: str):
    """
    Update profile details given updatebody and user id

    Args:
        item (UpdateBody): update body containing firstName, lastName, email, profileImage 
        and coverProfileImage

    Returns:
        userId (str): uID if the profile is successfully added
    """

    try:
        uid = updateProfile(uid, db, item)
        return {
            "detail": {
                "code": 200,
                "message": uid
            }
        }

    except:
        raise HTTPException(
            status_code=404,
            detail={"code": "404", "message": "Error updating user profile"},
        )


@app.get("/profile/achievements/{userId}", summary="gets all achievements of a user")
async def getAchievements(userId: str):
    """
    Gets all achievements of a user given a user id

    Args:
        userId (str): user's id

    Returns:
        achievementList: dictionary containing all achievements
    """
    try:
        achievementList = listAchievements(userId, db)
        return {
            "detail": {
                "code": 200,
                "message": achievementList,
            }
        }
    except:
        raise HTTPException(
            status_code=404,
            detail={"code": "404", "message": "Error getting achievements"},
        )


@app.get("/profile/tasks/{userId}", summary="gets all tasks assigned to the user")
async def getUserTasks(userId: str):
    """
    Gets all task details of a user given user id

    Args:
        userId (str): user's id

    Returns:
        taskListDoc: all details of tasks assigned to the user
    """
    try:
        taskListDoc = userTasks(userId, db)
        return {
            "detail": {
                "code": 200,
                "message": taskListDoc,
            }
        }
    except:
        raise HTTPException(
            status_code=404,
            detail={"code": "404", "message": "Error getting user's tasks"},
        )


@app.get("/profile/projects/{userId}", summary="gets all projects assigned to the user")
async def getUserProjects(userId: str):
    """
    Gets all project ids of a user given user id

    Args:
        userId (str): user's id

    Returns:
        projectList: list of project Ids
    """
    try:
        projectList = userProjects(userId, db)
        return {
            "detail": {
                "code": 200,
                "message": projectList,
            }
        }
    except:
        raise HTTPException(
            status_code=404,
            detail={"code": "404", "message": "Error getting user's projects"},
        )


@app.get("/profile/ratings/{userId}", summary="gets all ratings of a user")
async def getUserRating(userId: str):
    """
    Gets a users ratings given user Id

    Args:
        userId (str): user id

    Returns:
        ratingsList(dict): dictionary containing users ratings
    """

    try:
        ratingsList = userRatings(userId, db)
        return {
            "detail": {
                "code": 200,
                "message": ratingsList,
            }
        }
    except:
        raise HTTPException(
            status_code=404,
            detail={"code": "404", "message": "Error getting user's ratings"},
        )


@app.get("/profile/{userId}/get", summary="Get details of a user")
async def getProfileDetails(userId: str):
    """
    get user details given a user Id

    Args:
        userId (str): user id

    Returns:
        profDetails(dict): dictionary containing user details
    """

    try:
        profDetails = getProfDetails(userId, db)
        return {
            "detail": {
                "code": 200, 
                "message": profDetails
            }
        }
    except:
        raise HTTPException(
            status_code=404,
            detail={"code": "404", "message": "Error retrieving data from this user"},
        )


@app.post("/connections/send/{userId}", summary="sends a connection request to user")
async def sendConnectionRequest(userEmail: str, currUser: str):
    """
    Sends a connection request to user given their email. This will add it to their
    "pending connections".

    Args:
        userEmail (str): email of the user that you're sending a request to
        currUser (str): ID of user that is sending the request
    Returns:
        message (str): a message to show it was successful
    """
    try:
        messageStatus = sendConnection(userEmail, currUser, db)
        return {
            "detail": {
                "code": 200, 
                "message": messageStatus
            }
        }
    
    except HTTPException as e:
        if e.status_code == 400:
            raise
        elif e.status_code == 409:
            raise
        else:
            raise HTTPException(
                status_code=404,
                detail={
                    "code": "404",
                    "message": "Error retrieving data from this user",
                },
            )


@app.post("/connections/accept/{currUser}", summary="accepts a connection from given userId")
async def acceptConnectionRequest(currUser: str, userId: str):
    """
    Accepts a connection from given user id.

    Args:
        currUser (str): id of current active user
        userId (str): id of user you want to accept
    """
    try:
        acceptConnection(currUser, userId, db)
        return {
            "detail": {
                "code": 200,
                "message": f"Connection request successfully accepted!",
            }
        }
    except:
        raise HTTPException(
            status_code=404,
            detail={"code": "404", "message": "Error accepting connection request"},
        )


@app.post("/connections/decline/{currUser}", summary="declines a connection from given userId")
async def declineConnectionRequest(currUser: str, userId: str):
    """
    Declines a connection from given user id.

    Args:
        currUser (str): id of current active user
        userId (str): id of user you want to decline
    """
    try:
        declineConnection(currUser, userId, db)
        return {
            "detail": {
                "code": 200,
                "message": f"Connection request successfully declined",
            }
        }
    except:
        raise HTTPException(
            status_code=404,
            detail={"code": "404", "message": "Error declining connection request"},
        )


@app.get("/connections/get/{userId}", summary="gets all connections of a user")
async def getUserConnections(userId: str):
    """
    Gets all connections that the given userId is connected to.

    Args:
        userId (str): userId of the person you want connections of.

    Returns:
        connections (list): list of all connections of the given uId.
    """
    try:
        connections = getConnections(userId, "connectedTo", db)
        return {
            "detail": {
                "code": 200,
                "message": connections,
            }
        }
    except:
        raise HTTPException(
            status_code=404,
            detail={"code": "404", "message": "Error retrieving user's connections"},
        )


@app.get("/connections/getPending/{userId}", summary="gets pending connections of a user")
async def getPendingConnections(userId: str):
    """
    Gets all pending connections that the given userId is connected to.

    Args:
        userId (str): userId of the person you want connections of.

    Returns:
        pendingConnections (list): list of all pending connections of the given uId.
    """
    try:
        pendingConnections = getConnections(userId, "pendingConnections", db)
        return {
            "detail": {
                "code": 200,
                "message": pendingConnections,
            }
        }
    except:
        raise HTTPException(
            status_code=404,
            detail={"code": "404", "message": "Error retrieving user's connections"},
        )


@app.delete("/connections/remove/{userId}", summary="removes connection between two users")
async def removeConnection(currUser: str, userId: str):
    """
    Removes the connection between two users.

    Args:
        currUser (str): Current user's uID
        userId (str): User uID of the person you want to remove.
    
    Returns:
        status (str): str containing userFirstName, userLastName,currUserFirst and currUserLast
    """
    try:
        status = unfriend(currUser, userId, db)
        return {
            "detail": {
                "code": 200,
                "message": status,
            }
        }
    except HTTPException as e:
        if e.status_code == 400:
            raise
        raise HTTPException(
            status_code=404,
            detail={"code": "404", "message": "Error removing connection"},
        )

@app.get("/connections/checkPending/{userId}/{sendingUserId}", summary="Checks if a connection request has been sent")
async def checkPending(userId: str, sendingUserId: str):
    """
    Checks if the first user has already sent a connection request to the second user.
    Checks both user's pending connections

    Args:
        userId (str): the user you want to check pending connections for
        sendingUserId (str): the user you want to check if they've sent the connection

    Returns:
        bool: true if request is already pending, false otherwise
    """
    try:
        return isRequestPending(userId, sendingUserId, db)
    except:
        raise HTTPException(
            status_code=404,
            detail={"code": "404", "message": "Error checking pending connections"},
        )

@app.get("/connections/checkConnected/{currUser}/{otherUserId}", summary="Checks if the users are connected")
async def checkConnected(currUser: str, otherUserId: str):
    """
    Returns true if the current user and user given are connected

    Args:
        currUser (str): current user's ID
        otherUserId (str): second user's ID

    Returns:
        bool: returns true or false depending on if the users are connected
    """
    try: 
        return isConnectedTo(currUser, "uid", otherUserId, db)
    except:
        raise HTTPException(
            status_code=404,
            detail={"code": "404", "message": "Error checking connection"},
        )        

@app.post("/task/rate/{userId}", summary="Rate a task")
async def addTaskRating(rating: TaskRatingBody, userId: str):
    """
    Adds a rating to the task (replaces old rating if old rating exists)

    Args:
        rating (TaskRatingBody): body containing projectId, taskId, and mood
        userId (str): uID of the person who is rating the task

    Returns:
        task (dict): dictionary of the task containing task id and 
                    progress of the achievements
    """
    try:
        task = addRating(rating.projectId, rating.taskId, userId, rating.mood, db)
        return {
            "detail": {
                "code": 200,
                "message": task,
            }
        }
    except:
        raise HTTPException(
            status_code=404,
            detail={"code": "404", "message": "Error rating task"},
        )

@app.get("/workload/get/{userId}", summary="Gets the workload of a user")
async def getWorkload(userId: str):
    """
    Gets the workload stored for a given user

    Args:
        userId (str): user Id for the user you want to get the workload % of
    
    Returns:
        workloadValue (float): number that is a percentage of their workload out
                        of 100. A value of -1 means overloaded (>100%). This value
                        is rounded to 2 dp
    """
    try: 
        workloadValue = round(getWorkloadValue(userId, db), 2)
        return {
            "detail": {
                "code": 200,
                "message": workloadValue,
            }
        }
    except:
        raise HTTPException(
            status_code=404,
            detail={"code": "404", "message": "Error retrieving workload value"},
        )

@app.get("/profile/achievement/check/{userId}", summary="checks if achievement for given user is hidden or not")
async def checkHiddenAchievement(userId: str):
    """
    Checks a users achievement hidden status
    Args:
        userId (str): user Id 

    Returns:
        achievementCheck (bool): boolean showing if the achievement is hidden or not, true meaning it is hidden
    """

    try:
        achievementCheck = checkAchievement(userId, db)
        return {
            "detail": {
                "code": 200,
                "message": achievementCheck,
            }
        }
    except:
        raise HTTPException(
            status_code=404,
            detail={"code": "404", "message": "Error checking achievement"},
        )

@app.post("/profile/achievement/set/{userId}", summary="sets the hidden status of a user's achievements")
async def setHiddenAchievement(userId: str, hidden: bool):
    """
    Sets a users achievement hidden status
    Args:
        userId (str): user Id 
        hidden (bool): true if the achievements should be hidden, false otherwises

    Returns:
        userId (str): user Id
    """

    try:
        userId = setAchievement(userId, db, hidden)
        return {
            "detail": {
                "code": 200,
                "message": userId,
            }
        }
    except:
        raise HTTPException(
            status_code=404,
            detail={"code": "404", "message": "Error setting achievement"},
        )