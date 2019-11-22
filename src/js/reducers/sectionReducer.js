'use strict';

import {Map, List} from 'immutable';
import * as actionTypes from '../actions/actionTypes';

export default function sectionReducer(state = Map(), action) {

  switch (action.type) {
    case actionTypes.SET_SECTIONS:
      return state.set('sections', action.data);  //?? если это будет просто массив?  было List(action.data)

    case actionTypes.SET_CURRENT_SECTION:
      return state.set('currentSection', action.data);

    case actionTypes.SET_CURRENT_INFO_SECTION:
      return state.set('currentInfoSection', action.data);

    case actionTypes.SET_MODIFIABLE_SECTION:
      return state.set('modifiableSection', action.data);
    
    default:
      return state;
    }
}

