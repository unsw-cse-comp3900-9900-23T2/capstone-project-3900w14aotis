
def setAchievement(uid, db, hideAchievement):

    docs = db.collection("taskmasters").where("uid", "==", uid).limit(1).stream()  
    for doc in docs:
        doc.reference.update(
            {
                "achievementHidden": hideAchievement,
            }
        )    
    
    return uid
        