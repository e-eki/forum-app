'use strict';

import * as actionTypes from './actionTypes';

export function setCurrentUserChannel(data) {
	return {
	  type: actionTypes.SET_CURRENT_USER_CHANNEL,
	  data
	};
}