'use strict';

import {Map} from 'immutable';
import * as actionTypes from '../actions/actionTypes';

// управление темой оформления
export default function colorThemeReducer(state = Map(), action) {
  
  switch (action.type) {
    case actionTypes.SET_COLOR_THEME:
      return state.set('colorTheme', action.data);

    default:
      return state;
    }
}

