from src.serverHelper import getAchievement, findUser, getFromUser
from src.workload.calculateWorkload import updateWorkload


def updateTask(projectId, taskId, db, item):
    """Update task details given project and task Id

    Args:
        projectId (str): project Id
        taskId (str): task Id
        db (_type_): database
        item (body): update body

    Returns:
        taskId(str): taskId
    """
    projectDocRef = db.collection("projects").document(projectId)
    taskDocRef = projectDocRef.collection("tasks").document(taskId)
    taskDict = {
        "TaskID": taskId,
        "Task Fledgling": "In Progress",
        "Task Master": "In Progress",
    }
    # Check if user is part of the task's assignee list
    userRef = findUser("uid", item.creatorId, db)
    userEmail = userRef.get().get("email")
    # If user isnt part of task, return none
    assigneeList = taskDocRef.get().get("Assignees")
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
    for achievement in taskMasterDoc:
        goal = achievement.get("target")
        currValue = achievement.get("currentValue")
        # If Achievement is alrdy done, skip
        if currValue == goal:
            taskDict["Task Master"] = "Done"
            break

        else:
            currValue += 1
            # If current Value meets the goal, update achievement status to done
            if currValue == goal:
                achievement.reference.update(
                    {"currentValue": currValue, "status": "Done"}
                )
                taskDict["Task Master"] = "Done"
            else:
                achievement.reference.update(
                    {
                        "currentValue": currValue,
                    }
                )

    initialStatus = taskDocRef.get().get("Status")
    initialPriority = taskDocRef.get().get("Priority")
    initialDeadline = taskDocRef.get().get("Deadline")

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
