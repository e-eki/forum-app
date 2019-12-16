'use strict';

import {Map} from 'immutable';
import * as actionTypes from '../actions/actionTypes';

export default function messageReducer(state = Map(), action) {

  switch (action.type) {
    case actionTypes.SET_CURRENT_INFO_MESSAGE:
      return state.set('currentInfoMessage', action.data);

    case actionTypes.SET_MODIFIABLE_MESSAGE:
      return state.set('modifiableMessage', action.data);

    case actionTypes.SET_MOVING_MESSAGE:
      return state.set('movingMessage', action.data);

    default:
      return state;
    }
}

