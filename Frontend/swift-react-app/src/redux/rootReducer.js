import { combineReducers } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';

const rootReducer = combineReducers({
  task: taskReducer,
});

export default rootReducer;
