const API_URL = `http://localhost:${8000}`;
const API_MEDIA_TYPE = "application/json";

export const allConnectionsFetch = async (uId) => {
  const jsonData = JSON.stringify({
    uId,
  });

  const requestOption = {
    method: "GET",
    headers: { "Content-Type": API_MEDIA_TYPE },
    body: jsonData,
  };

  const allConnectionsPromise = await fetch(
    `${API_URL}/connections/get/${uId}`,
    requestOption
  );
  const allConnectionsResponse = await allConnectionsPromise.json();
  return allConnectionsResponse;
};

export const pendingConnectionsFetch = async (uId) => {
  const jsonData = JSON.stringify({
    uId,
  });

  const requestOption = {
    method: "GET",
    headers: { "Content-Type": API_MEDIA_TYPE },
    body: jsonData,
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

export const acceptConnectionFetch = async (email, uId) => {
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

export const declineConnectionFetch = async (email, uId) => {
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
