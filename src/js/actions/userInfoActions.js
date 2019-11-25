'use strict';

import * as actionTypes from './actionTypes';

export function setCurrentUserInfo(data) {
	return {
	  type: actionTypes.SET_CURRENT_USER_INFO,
	  data
	};
}

export function setModifiableUserInfo(data) {
	return {
	  type: actionTypes.SET_MODIFIABLE_USER_INFO,
	  data
	};
}