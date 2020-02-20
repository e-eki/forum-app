'use strict';

import {Map} from 'immutable';
import * as actionTypes from '../actions/actionTypes';

// управление разделом
export default function sectionReducer(state = Map(), action) {

  switch (action.type) {
    case actionTypes.SET_SECTIONS:
      return state.set('sections', action.data);

    case actionTypes.SET_CURRENT_SECTION:
      return state.set('currentSection', action.data);

    case actionTypes.SET_CURRENT_INFO_SECTION:
      return state.set('currentInfoSection', action.data);

    case actionTypes.SET_MODIFIABLE_SECTION:
      return state.set('modifiableSection', action.data);

    case actionTypes.SET_MOVING_SECTION:
      return state.set('movingSection', action.data);
    
    default:
      return state;
    }
}

