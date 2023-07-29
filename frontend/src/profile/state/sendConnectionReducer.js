// Reducer that changes the state of whether profile has been updated
const sendConnectionReducer = (state = 0, action) => {
  switch (action.type) {
    case "SEND-CONNECTION":
      return state + 1;
    default:
      return state;
  }
};

export default sendConnectionReducer;
