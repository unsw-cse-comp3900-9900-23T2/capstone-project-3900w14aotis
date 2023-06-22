from src.config.firestoreUtils import initialiseFirestore
from fastapi import FastAPI
from pydantic import BaseModel
from src.auth.register import authRegister
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
class taskMaster(BaseModel):
    firstName: str
    lastName: str
    password: str
    email: str


# Given a taskMaster class (including firstName, lastName, password, and email), create a new document representing
# the user whilst also adding a slot in the authentication section of firebase. Returns the
# uid of the authentication
@app.post("/auth/register", summary="Registers a user in the application")
async def register(item: taskMaster):
    uid = authRegister(item, db)
    return uid


# @app.get("/auth/register", summary="Registers a user in the application")
# async def register():
#     user = taskMaster(firstName="calvin",lastName="edaisdni",password="123453546",email=  "calvin@gmail.com")
#     uid = authRegister(user,db)
#     return uid


@app.get("/auth/login", summary="Logs a user in the application")
async def login():
    return {"message": "BABABBAA World"}
