'use strict';

import {Map, List} from 'immutable';
import * as actionTypes from '../actions/actionTypes';

// const initialState = {
//   users: [],
//   userProfile: {
//     repos: []
//   }
// };

export default function reducer(state = Map(), action) {
  debugger;
  switch (action.type) {
    case actionTypes.SET_SECTIONS:
      return state.set('sections', List(action.data));

    case actionTypes.SET_CURRENT_SECTION:
      return state.set('currentSection', action.data);

    case actionTypes.SET_CURRENT_SUBSECTION:
      return state.set('currentSubSection', action.data);

    case actionTypes.SET_CURRENT_CHANNEL:
      return state.set('currentChannel', action.data);

    case actionTypes.SET_CURRENT_USER_CHANNEL:
      return state.set('currentUserChannel', action.data);

    case actionTypes.SET_USER_INFO:
      return state.set('userInfo', action.data);
    
    default:
      return state;
    }
}

