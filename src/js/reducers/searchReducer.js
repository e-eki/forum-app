'use strict';

import {Map} from 'immutable';
import * as actionTypes from '../actions/actionTypes';

// управление поиском по форуму
export default function searchReducer(state = Map(), action) {

  switch (action.type) {
    case actionTypes.SET_SEARCH_CHANNELS:
      return state.set('searchChannels', action.data);

    case actionTypes.SET_SEARCH_MESSAGES:
      return state.set('searchMessages', action.data);

    case actionTypes.SET_SEARCH_TYPE:
      return state.set('searchType', action.data);

    case actionTypes.SET_SEARCH_TEXT:
      return state.set('searchText', action.data);

    default:
      return state;
    }
}

