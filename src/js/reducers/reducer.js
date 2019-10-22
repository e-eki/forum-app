'use strict';

import {Map, List} from 'immutable';
import * as actionTypes from '../actions/actionTypes';

export default function Reducer(state = Map(), action) {
  debugger;
  switch (action.type) {
    case actionTypes.SET_SECTIONS:
      return state.set('sections', action.sections);
    
    default:
      return state;
    }
}

