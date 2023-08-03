const API_URL = `http://localhost:${8000}`;
const API_MEDIA_TYPE = "application/json";

// Sends an API call to register an account for a user, given an id, first name,
// last name, password and email.
export const registerFetch = async (
  uid,
  firstName,
  lastName,
  password,
  email
) => {
  const tasks = [];
  const projects = [];
  const connectedTo = [];
  const pendingConnections = [];
  const profileImage = "";
  const coverProfileImage = "";

  const jsonData = JSON.stringify({
    uid,
    firstName,
    lastName,
    password,
    email,
    tasks,
    projects,
    connectedTo,
    pendingConnections,
    profileImage,
    coverProfileImage,
  });

  const requestOption = {
    method: "POST",
    headers: { "Content-Type": API_MEDIA_TYPE },
    body: jsonData,
  };

  const registerPromise = await fetch(
    `${API_URL}/auth/register`,
    requestOption
  );
  const registerResponse = await registerPromise.json();
  return registerResponse;
};

// Sends an API call to login to an account given email and password.
export const loginFetch = async (email, password) => {
  const jsonData = JSON.stringify({
    email,
    password,
  });

  const requestOption = {
    method: "POST",
    headers: { "Content-Type": API_MEDIA_TYPE },
    body: jsonData,
  };

  const loginPromise = await fetch(`${API_URL}/auth/login`, requestOption);
  const loginResponse = await loginPromise.json();
  return loginResponse;
};
