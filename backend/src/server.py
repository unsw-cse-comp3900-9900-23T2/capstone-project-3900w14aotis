from src.config.firestoreUtils import initialiseFirestore
from fastapi import FastAPI
from pydantic import BaseModel
from src.auth.register import authRegister
from fastapi.middleware.cors import CORSMiddleware

# from src.config.firestoreUtils import auth

# import json
# import requests
# import os
# from dotenv import load_dotenv

# load_dotenv()

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


class loginBody(BaseModel):
    email: str
    password: str


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


# @app.post("/auth/login", summary="Logs a user in the application")
# async def login(item: loginBody):
#     token = sign_in_with_email_and_password(item.email, item.password)
#     print(token)
#     return {"message": "BABABBAA World"}


# def sign_in_with_email_and_password(email, password, return_secure_token=True):
#     payload = json.dumps(
#         {
#             "email": email,
#             "password": password,
#             "return_secure_token": return_secure_token,
#         }
#     )

#     FIREBASE_WEB_API_KEY = os.getenv("PRIVATE_KEY")
#     rest_api_url = (
#         "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword"
#     )

#     r = requests.post(rest_api_url, params={"key": FIREBASE_WEB_API_KEY}, data=payload)

#     return r.json()
