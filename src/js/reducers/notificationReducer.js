'use strict';

import {Map} from 'immutable';
import * as actionTypes from '../actions/actionTypes';

export default function notificationReducer(state = Map(), action) {
  
  switch (action.type) {
    case actionTypes.SET_NEW_PRIVATE_MESSAGES_COUNT:
      debugger;
      if (!action.data) {
        return state.set('newPrivateMessagesCount', null);
      }
      else {
        let newPrivateMessagesCount = state.get('newPrivateMessagesCount');
        const newCount = newPrivateMessagesCount ? ++newPrivateMessagesCount : 1;

        return state.set('newPrivateMessagesCount', newCount);
      }
      break;

    default:
      return state;
    }
}

