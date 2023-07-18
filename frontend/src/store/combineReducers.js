import { combineReducers } from "redux";
import addTaskReducer from "../tasks/state/addTaskReducer";
import deleteTaskReducer from "../tasks/state/deleteTaskReducer";
import updateProfileReducer from "../profile/state/updateProfileReducer";

const rootReducer = combineReducers({
  taskAdded: addTaskReducer,
  taskDeleted: deleteTaskReducer,
  tasksUpdated: addTaskReducer,
  profileUpdated: updateProfileReducer,
});

export default rootReducer;
