'use strict';

import {Map} from 'immutable';
import * as actionTypes from '../actions/actionTypes';

export default function notificationReducer(state = Map(), action) {
  
  switch (action.type) {
    case actionTypes.SET_NEW_MESSAGES_NOTIFICATION:
      return state.set('newMessages', action.data);

    default:
      return state;
    }
}

