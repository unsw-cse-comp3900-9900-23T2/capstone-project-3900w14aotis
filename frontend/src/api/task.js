const API_URL = `http://localhost:${8000}`;
const API_MEDIA_TYPE = "application/json";

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
