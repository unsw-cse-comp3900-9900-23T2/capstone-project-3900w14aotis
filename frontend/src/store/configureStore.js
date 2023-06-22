import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './combineReducers.js';

const store = configureStore({
  reducer: rootReducer,
})

export default store;
