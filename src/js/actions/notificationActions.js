'use strict';

import * as actionTypes from './actionTypes';

export function setNewPrivateMessagesCount(data) {
	return {
	  type: actionTypes.SET_NEW_PRIVATE_MESSAGES_COUNT,
	  data
	};
}

export function incrementNewPrivateMessagesCount(data) {
	return {
	  type: actionTypes.INCREMENT_NEW_PRIVATE_MESSAGES_COUNT,
	  data
	};
}

