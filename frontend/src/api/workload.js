const API_URL = `http://localhost:${8000}`;
const API_MEDIA_TYPE = "application/json";

// Sends an api call to check how busy a user is, given the id of that user.
// This is known as their workload.
export const workloadFetch = async (uId) => {
  const requestOption = {
    method: "GET",
    headers: { "Content-Type": API_MEDIA_TYPE },
  };

  const workloadPromise = await fetch(
    `${API_URL}/workload/get/${uId}`,
    requestOption
  );
  const workloadResponse = await workloadPromise.json();
  return workloadResponse;
};
