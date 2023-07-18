const API_URL = `http://localhost:${8000}`;
const API_MEDIA_TYPE = "application/json";

export const allConnectionsFetch = async (uId) => {
  const requestOption = {
    method: "GET",
    headers: { "Content-Type": API_MEDIA_TYPE },
  };

  const allConnectionsPromise = await fetch(
    `${API_URL}/connections/get/${uId}`,
    requestOption
  );
  const allConnectionsResponse = await allConnectionsPromise.json();
  return allConnectionsResponse;
};

export const pendingConnectionsFetch = async (uId) => {
  const requestOption = {
    method: "GET",
    headers: { "Content-Type": API_MEDIA_TYPE },
  };

  const pendingConnectionsPromise = await fetch(
    `${API_URL}/connections/getPending/${uId}`,
    requestOption
  );
  const pendingConnectionsResponse = await pendingConnectionsPromise.json();
  return pendingConnectionsResponse;
};

export const sendConnectionFetch = async (email, uId) => {
  const jsonData = JSON.stringify({
    email,
    uId,
  });

  const requestOption = {
    method: "POST",
    headers: { "Content-Type": API_MEDIA_TYPE },
    body: jsonData,
  };

  const sendConnectionPromise = await fetch(
    `${API_URL}/connections/send/${uId}?userEmail=${email}&currUser=${uId}`,
    requestOption
  );
  const sendConnectionResponse = await sendConnectionPromise.json();
  return sendConnectionResponse;
};

export const acceptConnectionFetch = async (currUser, uId) => {
  const jsonData = JSON.stringify({
    currUser,
    uId,
  });

  const requestOption = {
    method: "POST",
    headers: { "Content-Type": API_MEDIA_TYPE },
    body: jsonData,
  };

  const acceptConnectionPromise = await fetch(
    `${API_URL}/connections/accept/${currUser}?userId=${uId}`,
    requestOption
  );
  const acceptConnectionResponse = await acceptConnectionPromise.json();
  return acceptConnectionResponse;
};

export const declineConnectionFetch = async (currUser, uId) => {
  const jsonData = JSON.stringify({
    currUser,
    uId,
  });

  const requestOption = {
    method: "POST",
    headers: { "Content-Type": API_MEDIA_TYPE },
    body: jsonData,
  };

  const declineConnectionPromise = await fetch(
    `${API_URL}/connections/decline/${currUser}?userId=${uId}`,
    requestOption
  );
  const declineConnectionResponse = await declineConnectionPromise.json();
  return declineConnectionResponse;
};

export const removeConnectionFetch = async (currUser, uId) => {
  const jsonData = JSON.stringify({
    currUser,
    uId,
  });

  const requestOption = {
    method: "DELETE",
    headers: { "Content-Type": API_MEDIA_TYPE },
    body: jsonData,
  };

  const removeConnectionPromise = await fetch(
    `${API_URL}/connections/remove/${uId}?currUser=${currUser}`,
    requestOption
  );
  const removeConnectionResponse = await removeConnectionPromise.json();
  return removeConnectionResponse;
};
