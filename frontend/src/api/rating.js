const API_URL = `http://localhost:${8000}`;
const API_MEDIA_TYPE = "application/json";

export const addRatingFetch = async (projectId, taskId, userId, mood) => {
  const jsonData = JSON.stringify({
    projectId,
    taskId,
    mood,
  });

  const requestOption = {
    method: "POST",
    headers: { "Content-Type": API_MEDIA_TYPE },
    body: jsonData,
  };

  const addRatingPromise = await fetch(
    `${API_URL}/task/rate/${userId}`,
    requestOption
  );

  const addRatingResponse = await addRatingPromise.json();
  return addRatingResponse;
};
