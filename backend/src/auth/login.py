from src.config.firestoreUtils import initialiseFirestore
from src.config.firestoreUtils import auth
import json
import requests
import os
from dotenv import load_dotenv

load_dotenv()


def authLogin(item, db):
    """_summary_

    Args:
        item (_type_): _description_
        db (_type_): _description_

    Returns:
        _type_: _description_
    """
    token = signInWithEmailAndPassword(item.email, item.password)
    return token


def signInWithEmailAndPassword(email, password, return_secure_token=True):
    """_summary_

    Args:
        email (_type_): _description_
        password (_type_): _description_
        return_secure_token (bool, optional): _description_. Defaults to True.

    Returns:
        _type_: _description_
    """
    payload = json.dumps(
        {
            "email": email,
            "password": password,
            "return_secure_token": return_secure_token,
        }
    )

    FIREBASE_WEB_API_KEY = os.getenv("WEB_API_KEY")
    rest_api_url = (
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword"
    )

    r = requests.post(rest_api_url, params={"key": FIREBASE_WEB_API_KEY}, data=payload)

    return r.json()
