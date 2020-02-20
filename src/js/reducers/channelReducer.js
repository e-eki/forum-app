'use strict';

import {Map} from 'immutable';
import * as actionTypes from '../actions/actionTypes';

// управление чатом
export default function channelReducer(state = Map(), action) {
  
  switch (action.type) {
    case actionTypes.SET_CURRENT_CHANNEL:
      return state.set('currentChannel', action.data);

    case actionTypes.SET_CURRENT_INFO_CHANNEL:
      return state.set('currentInfoChannel', action.data);

    case actionTypes.SET_MODIFIABLE_CHANNEL:
      return state.set('modifiableChannel', action.data);

    case actionTypes.SET_MOVING_CHANNEL:
      return state.set('movingChannel', action.data);

    default:
      return state;
    }
}

