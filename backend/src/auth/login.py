import json
import requests
import os
from dotenv import load_dotenv

load_dotenv()


def authLogin(item):
    """
    Logs in the user given an item involving email and password

    Args:
        item (LoginBody): item containing email and password
        db: database

    Returns:
        token: returns an authentication token for the login
    """
    token = signInWithEmailAndPassword(item.email, item.password)
    return token


def signInWithEmailAndPassword(email, password, return_secure_token=True):
    """
    Helper function that does the login 

    Args:
        email (str): email of the user
        password (str): password of the user
        return_secure_token (bool, optional): flag to secure token. Defaults to True.

    Returns:
        r.json: json payload with token (essentially the auth token)
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
