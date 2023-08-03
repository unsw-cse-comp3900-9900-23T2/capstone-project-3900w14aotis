// Action to register
export const registerAction = () => {
  localStorage.setItem("loggedIn", true);
  return {
    type: "REGISTER",
  };
};
