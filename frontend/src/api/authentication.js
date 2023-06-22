const API_URL = `http://localhost:${8000}`;
const API_MEDIA_TYPE = "application/json";

export const registerFetch = async (firstName, lastName, password, email) => {
  const jsonData = JSON.stringify({
    firstName,
    lastName,
    password,
    email,
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
