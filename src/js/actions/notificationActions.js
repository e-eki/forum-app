'use strict';

import * as actionTypes from './actionTypes';

// кол-во новых личных сообщений
export function setNewPrivateMessagesCount(data) {
	return {
	  type: actionTypes.SET_NEW_PRIVATE_MESSAGES_COUNT,
	  data
	};
}

// +1 к кол-ву новых личных сообщений
export function incrementNewPrivateMessagesCount(data) {
	return {
	  type: actionTypes.INCREMENT_NEW_PRIVATE_MESSAGES_COUNT,
	  data
	};
}

