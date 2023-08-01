const API_URL = `http://localhost:${8000}`;
const API_MEDIA_TYPE = "application/json";

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
