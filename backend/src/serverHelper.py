"""
This files contains helper functions that will help modularise 
"""
def findUser(queryField, queryValue, db):
    docs = db.collection("taskmasters").where(queryField, "==", queryValue).limit(1).stream()
    docId = ""
    for doc in docs: 
        docId = doc.id
    taskmasterRef = db.collection("taskmasters").document(docId)
    return taskmasterRef