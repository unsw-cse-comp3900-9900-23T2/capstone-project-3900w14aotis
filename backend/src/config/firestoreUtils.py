import firebase_admin

from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import auth

import os
from dotenv import load_dotenv

load_dotenv()

PROJECT_ID = os.getenv("PROJECT_ID")
PRIVATE_KEY_ID = os.getenv("PRIVATE_KEY_ID")
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
CLIENT_EMAIL = os.getenv("CLIENT_EMAIL")
CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_URL = os.getenv("CLIENT_URL")

serviceAccountKeyDict = {
    "type": "service_account",
    "project_id": PROJECT_ID,
    "private_key_id": PRIVATE_KEY_ID,
    "private_key": PRIVATE_KEY,
    "client_email": CLIENT_EMAIL,
    "client_id": CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": CLIENT_URL,
    "universe_domain": "googleapis.com",
}


def initialiseFirestore():
    """_summary_

    Returns:
        database: returns the firestore database
    """
    cred = credentials.Certificate(serviceAccountKeyDict)
    app = firebase_admin.initialize_app(cred)
    db = firestore.client()
    return db
