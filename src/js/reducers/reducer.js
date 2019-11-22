'use strict';

import {Map, List} from 'immutable';
import { combineReducers } from 'redux';
import * as actionTypes from '../actions/actionTypes';
import sectionReducer from './sectionReducer';
import subSectionReducer from './subSectionReducer';
import channelReducer from './channelReducer';
import messageReducer from './messageReducer';
import alertDataReducer from './alertDataReducer';


const reducer = combineReducers({
  sectionState: sectionReducer,
  subSectionState: subSectionReducer,
  channelState: channelReducer,
  messageState: messageReducer,
  alertDataState: alertDataReducer,
});

export default reducer;

// export default function reducer(state = Map(), action) {
//   debugger;
//   switch (action.type) {
//     case actionTypes.SET_SECTIONS:
//       return state.set('sections', action.data);  //?? если это будет просто массив?  было List(action.data)

//     case actionTypes.SET_CURRENT_SECTION:
//       return state.set('currentSection', action.data);

//     case actionTypes.SET_CURRENT_INFO_SECTION:
//       return state.set('currentInfoSection', action.data);

//     case actionTypes.SET_MODIFIABLE_SECTION:
//       return state.set('modifiableSection', action.data);


//     case actionTypes.SET_CURRENT_SUBSECTION:
//       return state.set('currentSubSection', action.data);

//     case actionTypes.SET_CURRENT_INFO_SUBSECTION:
//       return state.set('currentInfoSubSection', action.data);

//     case actionTypes.SET_MODIFIABLE_SUBSECTION:
//       return state.set('modifiableSubSection', action.data);


//     case actionTypes.SET_CURRENT_CHANNEL:
//       return state.set('currentChannel', action.data);

//     case actionTypes.SET_CURRENT_INFO_CHANNEL:
//       return state.set('currentInfoChannel', action.data);

//     case actionTypes.SET_MODIFIABLE_CHANNEL:
//       return state.set('modifiableChannel', action.data);


//     case actionTypes.SET_CURRENT_INFO_MESSAGE:
//       return state.set('currentInfoMessage', action.data);

//     case actionTypes.SET_MODIFIABLE_MESSAGE:
//       return state.set('modifiableMessage', action.data);


//     case actionTypes.SET_CURRENT_USER_CHANNEL:
//       return state.set('currentUserChannel', action.data);  //todo??

//     case actionTypes.SET_USER_INFO:
//       return state.set('userInfo', action.data);
    
//     default:
//       return state;
//     }
// }

