from src.config.firestoreUtils import initialiseFirestore
from fastapi import FastAPI
from pydantic import BaseModel
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


# Change this !
class Item(BaseModel):
    firstName: str
    description: str

class Task(BaseModel):
    title: str
    description: str
    deadline: datetime
    assignee: str


@app.post("/auth/register", summary="Registers a user in the application")
async def register(item: Item):
    """
    THIS IS AN EXAMPLE !
    Create an item with all the information:

    - **name**: each item must have a name
    - **description**: a long description
    - **price**: required
    - **tax**: if the item doesn't have tax, you can omit this
    - **tags**: a set of unique tag strings for this item
    """

    db.collection("taskmasters").add(
        {"firstName": "Sophia", "lastName": "Li", "email": "sophiali@gmail.com"}
    )
    return {"message": "USER CREATED"}


@app.post("/auth/login", summary="Logs a user in the application")
async def login():
    return {"message": "BABABBAA World"}


@app.post("/task/create", summary="Create a new task")
async def createTask(task: Task, projectId: str):
    taskId = createNewTask(task, projectId, db)
    return{"message": f"Task {taskId} created successfully"}

