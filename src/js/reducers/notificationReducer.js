'use strict';

import {Map} from 'immutable';
import * as actionTypes from '../actions/actionTypes';

export default function notificationReducer(state = Map(), action) {
  
  switch (action.type) {
    case actionTypes.SET_NEW_PRIVATE_MESSAGES_COUNT:
      return state.set('newPrivateMessagesCount', action.data);

    case actionTypes.INCREMENT_NEW_PRIVATE_MESSAGES_COUNT:
      let newPrivateMessagesCount = state.get('newPrivateMessagesCount');
      const newCount = newPrivateMessagesCount ? ++newPrivateMessagesCount : 1;

      return state.set('newPrivateMessagesCount', newCount);

    default:
      return state;
    }
}

