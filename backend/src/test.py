from config.firestoreUtils import initialiseFirestore

# import config.firestoreUtils

db = initialiseFirestore()
db.collection("taskmasters").add(
    {"firstName": "Calvin", "lastName": "Chang", "email": "calvinchang@gmail.com"}
)
