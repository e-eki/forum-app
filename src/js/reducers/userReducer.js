'use strict';

import {Map} from 'immutable';
import * as actionTypes from '../actions/actionTypes';

export default function userReducer(state = Map(), action) {

  switch (action.type) {
    case actionTypes.SET_USER_DATA:
      return state.set('userData', action.data);
    
    default:
      return state;
  }
}

