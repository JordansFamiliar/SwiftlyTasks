import { combineReducers } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';
import csrftokenReducer from './csrftokenSlice';

const rootReducer = combineReducers({
  task: taskReducer,
  csrftoken: csrftokenReducer,
});

export default rootReducer;
