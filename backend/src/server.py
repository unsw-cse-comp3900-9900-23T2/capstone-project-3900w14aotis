from src.config.firestoreUtils import initialiseFirestore
from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime

from src.task.createTask import createNewTask

db = initialiseFirestore()
app = FastAPI()


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
async def createTask(task: Task):
    taskId = createNewTask(task, db)
    return{"message": f"Task {taskId} create successfully"}

# @app.get("/task/create", summary="Create a new task")
# async def createTask():
#     task = Task(
#         title = "Finish 1st sprint",
#         description = "PLEASE let us do well",
#         deadline = datetime(2023, 6, 28),
#         assignee = "USER_ID"
#     )
#     taskId = createNewTask(task, db)
#     return{"message": f"NEW TASK CREATED!!! {taskId}"}


