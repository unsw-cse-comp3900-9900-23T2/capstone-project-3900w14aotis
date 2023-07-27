export const logoutAction = () => {
  localStorage.setItem("loggedIn", false);
  return {
    type: "LOGOUT",
  };
};
