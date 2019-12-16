'use strict';

import {Map} from 'immutable';
import * as actionTypes from '../actions/actionTypes';

export default function modifyingReducer(state = Map(), action) {
  
  switch (action.type) {
    case actionTypes.SET_PARENT_ITEMS_LIST:
      return state.set('parentItemsList', action.data);

    default:
      return state;
    }
}

