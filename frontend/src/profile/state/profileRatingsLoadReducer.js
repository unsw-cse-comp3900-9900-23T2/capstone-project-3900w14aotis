// Reducer that changes the state of profile ratings
const profileRatingsLoadReducer = (state = 0, action) => {
  switch (action.type) {
    case "PROFILE-RATINGS":
      return state + 1;
    default:
      return state;
  }
};

export default profileRatingsLoadReducer;
