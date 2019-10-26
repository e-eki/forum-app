'use strict';

import * as actionTypes from './actionTypes';

export function setUserInfo(data) {
	return {
	  type: actionTypes.SET_USER_INFO,
	  data
	};
}