'use strict';

import {Map} from 'immutable';
import * as actionTypes from '../actions/actionTypes';

export default function userInfoReducer(state = Map(), action) {

  switch (action.type) {
    case actionTypes.SET_CURRENT_USER_INFO:
      return state.set('currentUserInfo', action.data);

    case actionTypes.SET_MODIFIABLE_USER_INFO:
      return state.set('modifiableUserInfo', action.data);
    
    default:
      return state;
  }
}

