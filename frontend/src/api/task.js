const API_URL = `http://localhost:${8000}`;
const API_MEDIA_TYPE = "application/json";

// Sends an API call to create a project, given a project title and the id of
// the user creating the project.
export const createProjectFetch = async (title, user) => {
  const jsonData = JSON.stringify({
    title,
    user,
  });

  const requestOption = {
    method: "POST",
    headers: { "Content-Type": API_MEDIA_TYPE },
    body: jsonData,
  };

  const createProjectPromise = await fetch(
    `${API_URL}/project/create`,
    requestOption
  );

  const createProjectResponse = await createProjectPromise.json();
  return createProjectResponse;
};

// Sends an API call to join a project. Takes in the id of the user joining, and
// the project id.
export const joinProjectFetch = async (id, user) => {
  const jsonData = JSON.stringify({
    user,
  });

  const requestOption = {
    method: "POST",
    headers: { "Content-Type": API_MEDIA_TYPE },
    body: jsonData,
  };

  const joinProjectPromise = await fetch(
    `${API_URL}/project/join/${id}`,
    requestOption
  );

  const joinProjectResponse = await joinProjectPromise.json();
  return joinProjectResponse;
};

// Sends an API call to create a project task. Tasks will include details such
// as a title, description, deadline, assignee, prioriy and status.
export const createTaskFetch = async (
  projectId,
  title,
  description,
  deadline,
  assignees,
  priority,
  status,
  creatorId
) => {
  const jsonData = JSON.stringify({
    title,
    description,
    deadline: deadline ? deadline : new Date(0),
    assignees,
    priority,
    status,
    creationTime: new Date().toISOString(),
    creatorId,
  });

  const requestOption = {
    method: "POST",
    headers: { "Content-Type": API_MEDIA_TYPE },
    body: jsonData,
  };

  const createTaskPromise = await fetch(
    `${API_URL}/task/create/${projectId}`,
    requestOption
  );

  const createTaskResponse = await createTaskPromise.json();
  return createTaskResponse;
};

// Sends an API call to get all tasks within a project given a project ID.
export const allTasksFetch = async (projectId) => {
  const requestOption = {
    method: "GET",
    headers: { "Content-Type": API_MEDIA_TYPE },
  };

  const allTasksPromise = await fetch(
    `${API_URL}/tasks/${projectId}`,
    requestOption
  );

  const allTasksResponse = await allTasksPromise.json();
  return allTasksResponse;
};

// Sends an API call to get details of a task.
export const taskDetailFetch = async (projectId, taskId) => {
  const requestOption = {
    method: "GET",
    headers: { "Content-Type": API_MEDIA_TYPE },
  };

  const allTasksPromise = await fetch(
    `${API_URL}/task/${projectId}/${taskId}/get`,
    requestOption
  );

  const allTasksResponse = await allTasksPromise.json();
  return allTasksResponse;
};

// Sends an API call to update the details of a task.
export const updateTaskFetch = async (
  projectId,
  taskId,
  title,
  description,
  deadline,
  priority,
  status,
  creatorId
) => {
  const jsonData = JSON.stringify({
    title,
    description,
    deadline,
    priority,
    status,
    creatorId,
  });

  const requestOption = {
    method: "POST",
    headers: { "Content-Type": API_MEDIA_TYPE },
    body: jsonData,
  };

  const updateTaskPromise = await fetch(
    `${API_URL}/task/update/${projectId}/${taskId}`,
    requestOption
  );

  const updateTaskResponse = await updateTaskPromise.json();
  return updateTaskResponse;
};

// Sends an API call to delete a task, given the id of the task being deleted
// and the id of the project that the task is in.
export const deleteTaskFetch = async (projectId, taskId) => {
  const requestOption = {
    method: "DELETE",
    headers: { "Content-Type": API_MEDIA_TYPE },
  };

  const deleteTaskPromise = await fetch(
    `${API_URL}/task/delete/${projectId}/${taskId}`,
    requestOption
  );

  const deleteTaskResponse = await deleteTaskPromise.json();
  return deleteTaskResponse;
};
