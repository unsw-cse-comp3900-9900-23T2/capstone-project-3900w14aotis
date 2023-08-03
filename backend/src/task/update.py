from src.serverHelper import getAchievement, findUser, getFromUser, getTaskDoc
from src.workload.calculateWorkload import updateWorkload


def updateTask(projectId, taskId, db, item):
    """
    Update task details given project and task Id

    Args:
        projectId (str): project Id of the project
        taskId (str): task Id of the task in the project
        db (_type_): database
        item (body): update body

    Returns:
        taskId(str): taskId
    """
    projectDocRef = db.collection("projects").document(projectId)
    taskDocRef = projectDocRef.collection("tasks").document(taskId)
    taskDoc = getTaskDoc(projectId, taskId, db)
    taskDict = {
        "TaskID": taskId,
        "Task Fledgling": "In Progress",
        "Task Master": "In Progress",
        "Task Wizard" : "In Progress",
    }
    # Check if user is part of the task's assignee list
    userRef = findUser("uid", item.creatorId, db)
    userEmail = userRef.get().get("email")
    # If user isnt part of task, return none
    assigneeList = taskDoc.get("Assignees")
    if userEmail not in assigneeList:
        return None

    # If Task Fledgling Achievement is in progress, mark as done
    achievementDoc = getAchievement(db, "Task Fledgling", item.creatorId)
    for achievement in achievementDoc:
        if (achievement.get("status") == "In Progress") and (item.status == "Done"):
            achievement.reference.update(
                {
                    "currentValue": 1,
                    "status": "Done",
                }
            )
        taskDict["Task Fledgling"] = "Done"

    # Task Master Achievement
    taskMasterDoc = getAchievement(db, "Task Master", item.creatorId)
    incrementAchievement(taskMasterDoc, taskDict, "Task Master")

    # Task Wizard Achievement
    taskWizardDoc = getAchievement(db, "Task Wizard", item.creatorId)
    incrementAchievement(taskWizardDoc, taskDict, "Task Wizard")

    initialStatus = taskDoc["Status"]
    initialPriority = taskDoc["Priority"]
    initialDeadline = taskDoc["Deadline"]

    taskDocRef.update(
        {
            "Title": item.title,
            "Description": item.description,
            "Deadline": item.deadline,
            "Priority": item.priority,
            "Status": item.status,
        }
    )

    # if status changed:
    if (initialStatus != item.status or initialPriority != item.priority or initialDeadline != item.deadline):
        # update workload value
        for assigneeEmail in assigneeList:
            assigneeId = getFromUser("email", assigneeEmail, "uid", db)
            updateWorkload(assigneeId, db)

    return taskDict


def incrementAchievement(achievementDoc, dict, achievementName):
    for achievement in achievementDoc:
        goal = achievement.get("target")
        currValue = achievement.get("currentValue")
        # If Achievement is alrdy done, skip
        if currValue == goal:
            dict[achievementName] = "Done"
            break

        else:
            currValue += 1
            # If current Value meets the goal, update achievement status to done
            if currValue == goal:
                achievement.reference.update(
                    {"currentValue": currValue, "status": "Done"}
                )
                dict[achievementName] = "Done"
            else:
                achievement.reference.update(
                    {
                        "currentValue": currValue,
                    }
                )
    return
