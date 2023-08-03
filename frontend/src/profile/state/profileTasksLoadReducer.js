// Reducer that changes the state of profile tasks
const profileTasksLoadReducer = (state = 0, action) => {
  switch (action.type) {
    case "PROFILE-TASKS":
      return state + 1;
    default:
      return state;
  }
};

export default profileTasksLoadReducer;
