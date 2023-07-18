"""
This file contains helper functions to get all achievements of a user given userId within a project.
"""


def listAchievements(userId, db):
    parentDocId = userId
    subCollection = "achievements"
    parentDocRef = db.collection("achievements").document(parentDocId)
    achievementList = []
    achievementCollection = parentDocRef.collection(subCollection).stream()
    for achievement in achievementCollection:
        achievementDict = achievement.to_dict()
        achievementDict["achievementId"] = achievement.id
        achievementList.append(achievementDict)

    return achievementList
