import { combineReducers } from "redux";
import addTaskReducer from "../tasks/state/addTaskReducer";
import deleteTaskReducer from "../tasks/state/deleteTaskReducer";
import updateProfileReducer from "../profile/state/updateProfileReducer";
import removeConnectionReducer from "../connections/state/removeConnectionReducer";
import addConnectionReducer from "../connections/state/addConnectionReducer";
import sendConnectionReducer from "../profile/state/sendConnectionReducer";
const rootReducer = combineReducers({
  taskAdded: addTaskReducer,
  taskDeleted: deleteTaskReducer,
  tasksUpdated: addTaskReducer,
  profileUpdated: updateProfileReducer,
  connectionAdded: addConnectionReducer,
  connectionRemoved: removeConnectionReducer,
  connectionSent: sendConnectionReducer,
});

export default rootReducer;
