

def userRatings(uid, db):
    parentDocRef = db.collection("projects").get()
    ratingDict = {
        "Very Happy": 0,
        "Happy": 0,
        "Tiring": 0,
        "Angry": 0,
        "Sad": 0,
        "Very Sad": 0,
    }
    for project in parentDocRef:
        taskDocRef = db.collection("projects").document(project.id).collection("tasks").get()
        for task in taskDocRef:  
            ratingMap = task.get("Rating")
            for key,value in ratingMap.items():
                if uid in value:
                    ratingDict[key] += 1
            

    return ratingDict