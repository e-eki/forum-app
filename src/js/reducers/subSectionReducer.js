'use strict';

import {Map} from 'immutable';
import * as actionTypes from '../actions/actionTypes';

export default function subSectionReducer(state = Map(), action) {

  switch (action.type) {
    case actionTypes.SET_CURRENT_SUBSECTION:
      return state.set('currentSubSection', action.data);

    case actionTypes.SET_CURRENT_INFO_SUBSECTION:
      return state.set('currentInfoSubSection', action.data);

    case actionTypes.SET_MODIFIABLE_SUBSECTION:
      return state.set('modifiableSubSection', action.data);
    
    default:
      return state;
    }
}

