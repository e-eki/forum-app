'use strict';

import * as actionTypes from './actionTypes';

export function setNewPrivateMessagesCount(data) {
	return {
	  type: actionTypes.SET_NEW_PRIVATE_MESSAGES_COUNT,
	  data
	};
}

