from src.config.firestoreUtils import initialiseFirestore
from fastapi import FastAPI, HTTPException, Depends, Header
from pydantic import BaseModel
from src.auth.register import authRegister
from src.auth.login import authLogin
from datetime import datetime
from src.task.createTask import createNewTask
from src.task.createProject import createNewProject
from src.task.getTasks import listTasks
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
from src.achievement.getAchievements import listAchievements
from src.connections.sendConnection import sendConnection
from src.connections.connectionRespond import acceptConnection
from src.connections.connectionRespond import declineConnection
from src.connections.getConnections import getConnections
from src.connections.connectionRemove import unfriend

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


class NewProject(BaseModel):
    title: str
    user: str


class Assignee(BaseModel):
    projectId: str
    taskId: str
    userId: str


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


# Given a taskMaster class (including firstName, lastName, password, and email), create a new document representing
# the user whilst also adding a slot in the authentication section of firebase. Returns the
# uid of the authentication
@app.post("/auth/register", summary="Registers a user in the application")
async def register(item: TaskMaster):
    """_summary_

    Args:
        item (taskMaster): _description_

    Raises:
        HTTPException: _description_

    Returns:
        _type_: _description_
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
        task (Task): details of the task including a title, description,
        deadline and assignees

    Returns:
        (obj) : result object returned by firebase auth
    """
    try:
        taskId = createNewTask(task, projectId, db)
        return {
            "detail": {
                "code": 200,
                "message": f"Task {taskId[1].id} created successfully",
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
        project (str): title of the project

    Returns:
        (obj) : result object returned by firebase auth
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
    """gets the details of a task

    Args:
        projectId (str): project id
        taskId (str): task id

    Raises:
        HTTPException: _description_

    Returns:
        taskDetails(dict): dictionary of task details
    """
    try:
        taskDetails = getDetails(projectId, taskId, db)
        return {"detail": {"code": 200, "message": taskDetails}}
    except:
        raise HTTPException(
            status_code=404,
            detail={"code": "404", "message": "Error retrieving data from this task"},
        )


@app.get("/tasks/{projectId}", summary="Lists the tasks of given project")
async def getTasks(projectId: str):
    """get tasks of a project

    Args:
        projectId (str): project Id

    Raises:
        HTTPException: _description_

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


@app.post("/project/join/{projectId}", summary="Join a project")
async def joinProject(item: JoinProject, projectId: str):
    """_summary_

    Args:
        item (JoinProject): _description_
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
        projectId (str): ID for the project that the task is in
        taskId (str): ID for the task that you want to assign someone to
        userId (str): uID of the person you want to assign

    Returns:
        userId (str): uID if the user is successfully added
    """
    try:
        assigned = addAssignee(assignee.projectId, assignee.taskId, assignee.userId, db)
        return {
            "detail": {"code": 200, "message": f"User: {assigned} successfully added"}
        }
    except:
        raise HTTPException(
            status_code=404,
            detail={"code": "404", "message": "Error assigning taskmaster"},
        )


@app.delete("/task/deleteTaskAssignee", summary="Removes an assignee from a task")
async def deleteTaskAssignee(assignee: Assignee):
    """
    This function removes an assignee from a task.

    Args:
        projectId (str): ID for the project that the task is in
        taskId (str): ID for the task that you want to remove someone from
        userId (str): uID of the person you want to remove

    Returns:
        userId (str): uID if the user is successfully added
    """
    try:
        deleted = deleteAssignee(
            assignee.projectId, assignee.taskId, assignee.userId, db
        )
        return {
            "detail": {"code": 200, "message": f"User: {deleted} successfully removed"}
        }
    except:
        raise HTTPException(
            status_code=404,
            detail={"code": "404", "message": "Error removing taskmaster"},
        )

@app.delete("/task/delete/{projectId}/{taskId}", summary="Removes a task")
async def deleteTask(projectId:str, taskId:str):
    """
    This function removes a task from a project

    Args:
        projectId (str): ID for the project that the task is in
        taskId (str): ID for the task that you want to remove someone from

    Returns:
        deleted (str): taskId if it has been removed
    """
    try:
        deleted = taskRemove(projectId,taskId, db)
        return {
            "detail": {"code": 200, "message": f"Task: {deleted} successfully removed"}
        }
    except:
        raise HTTPException(
            status_code=404,
            detail={"code": "404", "message": "Error removing task"},
        )
    
@app.post("/task/update/{projectId}/{taskId}", summary="Updates a tasks details")
async def updateTaskDetails(item: UpdateTask, projectId: str, taskId: str):
    """Update task details given project and task Id

    Args:
        item (UpdateTask): update body
        projectId (str): project ID
        taskId (str): task ID

    Raises:
        HTTPException: _description_

    Returns:
        taskId (str): taskId if the task id successfully updated
    """

    try:
        taskId = updateTask(projectId, taskId, db, item)
        return {
            "detail": {"code": 200, "message": f"Task {taskId} updated successfully"}
        }

    except:
        raise HTTPException(
            status_code=404, detail={"code": "404", "message": "Error updating task"}
        )


@app.post("/profile/update/{uid}", summary="Updates a user's profile details")
async def updateProfileDetails(item: UpdateBody, uid: str):
    """_summary_

    Args:
        firstName(str)
        lastName(str)
        email(str)
        profileImage(str): str for profile picture
        coverProfileImage(str): str for cover photo

    Raises:
        HTTPException: _description_

    Returns:
        userId (str): uID if the profile is successfully added
    """

    try:
        uid = updateProfile(uid, db, item)
        return {"detail": {"code": 200, "message": uid}}

    except:
        raise HTTPException(
            status_code=404,
            detail={"code": "404", "message": "Error updating user profile"},
        )


@app.get("/profile/achievements/{userId}", summary="gets all achievements of a user")
async def getAchievements(userId: str):
    """Gets all achievements of a user given a user id

    Args:
        userId (str): user's id

    Raises:
        HTTPException: _description_

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
    """Gets all task details of a user given user id

    Args:
        userId (str): user's id

    Raises:
        HTTPException: _description_

    Returns:
        taskList: all details of tasks assigned to the user
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
    """Gets all project ids of a user given user id

    Args:
        userId (str): user's id

    Raises:
        HTTPException: _description_

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
    """Gets a users ratings given user Id

    Args:
        userId (str): user id

    Raises:
        HTTPException: _description_

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
    """get user details given a user Id

    Args:
        userId (str): user id

    Raises:
        HTTPException: _description_

    Returns:
        profDetails(dict): dictionary containing user details
    """

    try:
        profDetails = getProfDetails(userId, db)
        return {"detail": {"code": 200, "message": profDetails}}
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
        currUser (str): ID of user that is sending the request
        userEmail (str): email of the user that you're sending a request to

    Returns:
        message (str): a message to show it was successful
    """
    try:
        sendConnection(userEmail, currUser, db)
        return {
            "detail": {"code": 200, "message": f"Connection request successfully sent!"}
        }
    except:
        raise HTTPException(
            status_code=404,
            detail={"code": "404", "message": "Error sending connection request"},
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
        connections (list): list of all pending connections of the given uId.
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
    """
    try:
        status = unfriend(currUser, userId, db)
        return {
            "detail": {
                "code": 200,
                "message": status,
            }
        }
    except:
        raise HTTPException(
            status_code=404,
            detail={"code": "404", "message": "Error removing connection"},
        )