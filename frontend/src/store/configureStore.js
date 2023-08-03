import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./combineReducers.js";

/**
 * This sets up the store.
 * What is the store you may ask?
 * The store is a state container.
 */
const store = configureStore({
  reducer: rootReducer,
});

export default store;
