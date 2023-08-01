// Reducer that changes the state of whether a achievements should be updated
const profileRatingsLoadReducer = (state = 0, action) => {
    switch (action.type) {
      case "PROFILE-RATINGS":
        return state + 1;
      default:
        return state;
    }
  };
  
  export default profileRatingsLoadReducer;
  