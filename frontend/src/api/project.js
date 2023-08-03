const API_URL = `http://localhost:${8000}`;
const API_MEDIA_TYPE = "application/json";

// Sends an API call to get all projects in the system.
export const allProjectsFetch = async (userId) => {
  const requestOption = {
    method: "GET",
    headers: { "Content-Type": API_MEDIA_TYPE },
  };

  const allProjectsPromise = await fetch(
    `${API_URL}/profile/projects/${userId}`,
    requestOption
  );

  const allProjectsResponse = await allProjectsPromise.json();
  return allProjectsResponse;
};
