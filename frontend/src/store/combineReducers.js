import { combineReducers } from "redux";
import addTaskReducer from "../tasks/state/addTaskReducer";
import updateProfileReducer from "../profile/state/updateProfileReducer";

const rootReducer = combineReducers({
  tasksUpdated: addTaskReducer,
  profileUpdated: updateProfileReducer,
});

export default rootReducer;
