def checkAchievement(uid, db):
    achievementHidden = bool;
    docs = db.collection("taskmasters").where("uid", "==", uid).limit(1).stream()  
    for doc in docs:
        achievementHidden = doc.get("achievementHidden")
    
    return achievementHidden
        
