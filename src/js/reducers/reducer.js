'use strict';

import {Map, List} from 'immutable';
import { combineReducers } from 'redux';
import * as actionTypes from '../actions/actionTypes';
import sectionReducer from './sectionReducer';
import subSectionReducer from './subSectionReducer';
import channelReducer from './channelReducer';
import messageReducer from './messageReducer';
import alertDataReducer from './alertDataReducer';
import userInfoReducer from './userInfoReducer';
import privateChannelReducer from './privateChannelReducer';

const reducer = combineReducers({
  sectionState: sectionReducer,
  subSectionState: subSectionReducer,
  channelState: channelReducer,
  messageState: messageReducer,
  alertDataState: alertDataReducer,
  userInfo: userInfoReducer,
  privateChannelState: privateChannelReducer,
});

export default reducer;
