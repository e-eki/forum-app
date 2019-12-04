'use strict';

import * as actionTypes from './actionTypes';

export function setNewMessagesNotification(data) {
	return {
	  type: actionTypes.SET_NEW_MESSAGES_NOTIFICATION,
	  data
	};
}
