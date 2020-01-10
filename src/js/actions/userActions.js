'use strict';

import * as actionTypes from './actionTypes';

export function setUserData(data) {
	return {
	  type: actionTypes.SET_USER_DATA,
	  data
	};
}
