'use strict';

import {Map} from 'immutable';
import * as actionTypes from '../actions/actionTypes';

export default function privateChannelReducer(state = Map(), action) {
  
  switch (action.type) {
    case actionTypes.SET_CURRENT_PRIVATE_CHANNEL:
      return state.set('currentPrivateChannel', action.data);

    default:
      return state;
    }
}

