// Reducer for auth actions
const authReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return true;
    case "LOGOUT":
      return false;
    default:
      return state;
  }
};

export default authReducer;
