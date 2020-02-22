'use strict';

import {Map} from 'immutable';
import * as actionTypes from '../actions/actionTypes';

// управление оформлением форума
export default function forumDesignReducer(state = Map(), action) {
  
  switch (action.type) {
    case actionTypes.SET_COLOR_THEME:
      return state.set('colorTheme', action.data);

    default:
      return state;
    }
}

