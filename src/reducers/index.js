import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../slice/userSlice';
import videoReducer from '../slice/videoSlice';

const rootReducer = combineReducers({
  user: userReducer,
  video: videoReducer,
});

export default rootReducer;