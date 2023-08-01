export const loginAction = () => {
  localStorage.setItem("loggedIn", true);
  return {
    type: "LOGIN",
  };
};
