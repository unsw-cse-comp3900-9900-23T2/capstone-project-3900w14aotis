from src.config.firestoreUtils import initialiseFirestore
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from src.auth.register import authRegister
from src.auth.login import authLogin
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


class loginBody(BaseModel):
    email: str
    password: str


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
        uid = authRegister(item, db)
        return {"detail": {"code": 200, "message": uid}}
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
