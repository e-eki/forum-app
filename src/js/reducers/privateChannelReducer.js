'use strict';

import {Map} from 'immutable';
import * as actionTypes from '../actions/actionTypes';

// управление личным чатом
export default function privateChannelReducer(state = Map(), action) {
  
  switch (action.type) {
    case actionTypes.SET_CURRENT_PRIVATE_CHANNEL:
      return state.set('currentPrivateChannel', action.data);

    case actionTypes.SET_PRIVATE_CHANNELS:
      return state.set('privateChannels', action.data);

    default:
      return state;
    }
}

