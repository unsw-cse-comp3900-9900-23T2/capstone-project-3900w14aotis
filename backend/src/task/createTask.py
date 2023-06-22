from src.config.firestoreUtils import initialiseFirestore
from pydantic import BaseModel
from datetime import datetime



# Takes in a title, description, optional deadline, and assignee to create a task.
# Returns task id if creation was succesful and _____ if unsuccessful.
# def createTask(title, description, deadline, assignee):
def createNewTask(newTask, db):

    """
    db.collection().add() returns two variables
    The reference token of the added variable is the second variable and can be
    accessed through the "id" field.
    """

    taskRef = db.collection("tasks").add({
        "title": newTask.title,
        "description": newTask.description,
        "deadline": newTask.deadline,
        "assignee": newTask.assignee
    })

    # TODO: handle error if could not add to db
    return taskRef[1].id
