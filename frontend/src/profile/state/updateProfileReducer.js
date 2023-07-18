// Reducer that changes the state of whether a task has been added
const updateProfileReducer = (state = 0, action) => {
  switch (action.type) {
    case "UPDATE-PROFILE":
      return state + 1;
    default:
      return state;
  }
};

export default updateProfileReducer;
