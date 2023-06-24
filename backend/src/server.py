# from array import array
from src.config.firestoreUtils import initialiseFirestore
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from src.auth.register import authRegister
from src.auth.login import authLogin
from datetime import datetime
from src.task.createTask import createNewTask
from fastapi.middleware.cors import CORSMiddleware


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

class taskMaster(BaseModel):
    firstName: str
    lastName: str
    password: str
    email: str
    tasks: list[str]
    projects: list[str]


class loginBody(BaseModel):
    email: str
    password: str

class Task(BaseModel):
    title: str
    description: str
    deadline: datetime
    assignee: list[str]



# Given a taskMaster class (including firstName, lastName, password, and email), create a new document representing
# the user whilst also adding a slot in the authentication section of firebase. Returns the
# uid of the authentication
@app.post("/auth/register", summary="Registers a user in the application")
async def register(item: taskMaster):
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
async def login(item: loginBody):
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


@app.post("/task/create/{projectID}", summary="Create a new task")
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
        return {"detail": {"code": 200, "message": f"Task {taskId[1].id} created successfully"}}
    except:
        raise HTTPException(
            status_code=404, detail={"code": "404", "message": "Error creating a new task"}
        )

@app.get("/task/getDetails/{projectID}", summary="Get details of a task")
async def getTaskDetails(taskId: str, projectId: str):
    """
    This function gets the details of a task in a project.

    Args:
        projectId (str): reference id of the project the task is in
        taskId (str): reference id of desired task

    Returns:
        doc (dict): dictionary containing the details of the doc
    """

    try:
        task_details = getTaskDetails(taskId, projectId, db)
        return {"detail": {"code": 200, "message": f"Details of task: {task_details}"}}
    except: 
        raise HTTPException(
            status_code=404, detail={"code": "404", "message": "Error retrieving data from this task"}
        )

