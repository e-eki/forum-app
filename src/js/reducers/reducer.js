'use strict';

import { combineReducers } from 'redux';
import sectionReducer from './sectionReducer';
import subSectionReducer from './subSectionReducer';
import channelReducer from './channelReducer';
import messageReducer from './messageReducer';
import alertDataReducer from './alertDataReducer';
import userInfoReducer from './userInfoReducer';
import privateChannelReducer from './privateChannelReducer';
import searchReducer from './searchReducer';
import notificationReducer from './notificationReducer';
import modifyingReducer from './modifyingReducer';
import authReducer from './authReducer';
import forumDesignReducer from './forumDesignReducer';


const reducer = combineReducers({
  sectionState: sectionReducer,
  subSectionState: subSectionReducer,
  channelState: channelReducer,
  messageState: messageReducer,
  alertDataState: alertDataReducer,
  userInfoState: userInfoReducer,
  privateChannelState: privateChannelReducer,
  searchState: searchReducer,
  notificationState: notificationReducer,
  modifyingState: modifyingReducer,
  authState: authReducer,
  forumDesignState: forumDesignReducer,
});

export default reducer;
