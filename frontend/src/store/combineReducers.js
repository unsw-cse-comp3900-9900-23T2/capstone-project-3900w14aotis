import { combineReducers } from "redux";
import addTaskReducer from "../tasks/state/addTaskReducer";
import deleteTaskReducer from "../tasks/state/deleteTaskReducer";

const rootReducer = combineReducers({
  taskAdded: addTaskReducer,
  taskDeleted: deleteTaskReducer,
});

export default rootReducer;
