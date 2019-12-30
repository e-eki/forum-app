'use strict';

import {Map} from 'immutable';
import * as actionTypes from '../actions/actionTypes';

export default function authReducer(state = Map(), action) {
  
  switch (action.type) {
    case actionTypes.SET_ACCESS_TOKEN:
      return state.set('accessToken', action.data);

    case actionTypes.SET_REFRESH_TOKEN:
      return state.set('refreshToken', action.data);

    case actionTypes.SET_ACCESS_TOKEN_EXPIRES_IN:
      return state.set('accessTokenExpiresIn', action.data);

    default:
      return state;
    }
}

