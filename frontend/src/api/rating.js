const API_URL = `http://localhost:${8000}`;
const API_MEDIA_TYPE = "application/json";

// Sends an API call to update the rating of a task, given a projectId, taskId,
// userId, and mood.
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

// Sends an API call to get all the ratings of a user, given the user's id.
export const allRatingsFetch = async (userId) => {
  const requestOption = {
    method: "GET",
    headers: { "Content-Type": API_MEDIA_TYPE },
  };

  const allRatingsPromise = await fetch(
    `${API_URL}/profile/ratings/${userId}`,
    requestOption
  );

  const allRatingsResponse = await allRatingsPromise.json();
  return allRatingsResponse;
};
