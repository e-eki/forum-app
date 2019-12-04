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

const reducer = combineReducers({
  sectionState: sectionReducer,
  subSectionState: subSectionReducer,
  channelState: channelReducer,
  messageState: messageReducer,
  alertDataState: alertDataReducer,
  userInfo: userInfoReducer,
  privateChannelState: privateChannelReducer,
  searchState: searchReducer,
  notificationState: notificationReducer,
});

export default reducer;
