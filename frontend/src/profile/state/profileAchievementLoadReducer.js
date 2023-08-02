// Reducer that changes the state of whether a achievements should be updated
const profileAchievementLoadReducer = (state = 0, action) => {
    switch (action.type) {
      case "PROFILE-ACHIEVEMENT":
        return state + 1;
      default:
        return state;
    }
  };
  
  export default profileAchievementLoadReducer;
  