'use strict';

import {Map, List} from 'immutable';
import * as actionTypes from '../actions/actionTypes';

export default function Reducer(state = Map(), action) {
  switch (action.type) {
    case actionTypes.SET_SECTIONS:
      return state.set('sections', List(action.sections));

    case actionTypes.SET_CURRENT_SECTION:
      return state.set('section', List(action.section));
    
    default:
      return state;
    }
}

