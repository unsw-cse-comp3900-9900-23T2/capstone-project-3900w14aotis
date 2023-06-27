const API_URL = `http://localhost:${8000}`;
const API_MEDIA_TYPE = 'application/json';

export const createProjectFetch = async (title, user) => {
  const jsonData = JSON.stringify({
    title,
    user,
  });

  const requestOption = {
    method: 'POST',
    headers: { 'Content-Type': API_MEDIA_TYPE },
    body: jsonData,
  };

  const createProjectPromise = await fetch(
    `${API_URL}/project/create`,
    requestOption
  );

  const createProjectResponse = await createProjectPromise.json();
  return createProjectResponse;
};

export const joinProjectFetch = async (id, user) => {
  const jsonData = JSON.stringify({
    user,
  });

  const requestOption = {
    method: 'POST',
    headers: { 'Content-Type': API_MEDIA_TYPE },
    body: jsonData,
  };

  const joinProjectPromise = await fetch(
    `${API_URL}/project/join/${id}`,
    requestOption
  );

  const joinProjectResponse = await joinProjectPromise.json();
  return joinProjectResponse;
};

export const createTaskFetch = async (
  projectId,
  title,
  description,
  deadline,
  assignees,
  priority,
  status
) => {
  const jsonData = JSON.stringify({
    title,
    description,
    deadline,
    assignees,
    priority,
    status,
  });

  const requestOption = {
    method: 'POST',
    headers: { 'Content-Type': API_MEDIA_TYPE },
    body: jsonData,
  };

  const createTaskPromise = await fetch(
    `${API_URL}/task/create/${projectId}`,
    requestOption
  );

  const createTaskResponse = await createTaskPromise.json();
  return createTaskResponse;
};

export const allTasksFetch = async (projectId) => {
  const requestOption = {
    method: 'GET',
    headers: { 'Content-Type': API_MEDIA_TYPE },
  };

  const allTasksPromise = await fetch(
    `${API_URL}/tasks/${projectId}`,
    requestOption
  );

  const allTasksResponse = await allTasksPromise.json();
  return allTasksResponse;
};

export const taskDetailFetch = async (projectId, taskId) => {
  const requestOption = {
    method: 'GET',
    headers: { 'Content-Type': API_MEDIA_TYPE },
  };

  const allTasksPromise = await fetch(
    `${API_URL}/task/${projectId}/${taskId}/get`,
    requestOption
  );

  const allTasksResponse = await allTasksPromise.json();
  return allTasksResponse;
};
