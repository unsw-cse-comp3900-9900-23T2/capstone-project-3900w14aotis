import { combineReducers } from "redux";
import addTaskReducer from "../tasks/state/addTaskReducer";

const rootReducer = combineReducers({
  tasksUpdated: addTaskReducer,
});

export default rootReducer;
