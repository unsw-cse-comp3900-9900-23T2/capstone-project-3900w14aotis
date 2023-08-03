const API_URL = `http://localhost:${8000}`;
const API_MEDIA_TYPE = "application/json";

// Sends an API to get all connections of a user, given that user's id.
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

// Sends an API to get all pending connections of a user, given that user's id.
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

// Sends an API to send a connection to another user. Takes in the current user's
// id and the email of the user being sent a connection request.
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

// Sends an API to accept a pending connection request. Takes in the id of the
// user accepting the connection request and the id of the user sending the request.
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

// Sends an API to accept a pending connection request. Takes in the id of the
// user declining the connection request and the id of the user sending the request.
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

// Sends an API to remove a connection from a user's connections list.
// Takes in the id of the user removing the connection, and the id of the
// user being removed.
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

// Sends an API to check whether two users are connected, given the ids
// of the two users being checked.
export const checkConnectionFetch = async (currUser, otherUser) => {
  const requestOption = {
    method: "GET",
    headers: { "Content-Type": API_MEDIA_TYPE },
  };

  const checkConnectionPromise = await fetch(
    `${API_URL}/connections/checkConnected/${currUser}/${otherUser}`,
    requestOption
  );
  const checkConnectionResponse = await checkConnectionPromise.json();
  return checkConnectionResponse;
};

// Sends an API to check whether a user has sent another user a connection
// request which hasn't been accepted or declined. Takes in the id of the user
// sending the request and the id of the user with the pending request.
export const checkPendingFetch = async (uId, sendingUser) => {
  const requestOption = {
    method: "GET",
    headers: { "Content-Type": API_MEDIA_TYPE },
  };

  const checkPendingPromise = await fetch(
    `${API_URL}/connections/checkPending/${uId}/${sendingUser}`,
    requestOption
  );
  const checkPendingResponse = await checkPendingPromise.json();
  return checkPendingResponse;
};
