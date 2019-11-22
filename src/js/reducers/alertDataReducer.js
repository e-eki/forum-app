'use strict';

import {Map} from 'immutable';
import * as actionTypes from '../actions/actionTypes';

export default function alertDataReducer(state = Map(), action) {
  
  switch (action.type) {
    case actionTypes.SET_ALERT_DATA:
      return state.set('alertData', action.data);

    default:
      return state;
    }
}

