'use strict';

import * as actionTypes from './actionTypes';

export function setUserId(data) {
	return {
	  type: actionTypes.SET_USER_ID,
	  data
	};
}

export function setUserRole(data) {
	return {
	  type: actionTypes.SET_USER_ROLE,
	  data
	};
}

export function setAccessToken(data) {
	return {
	  type: actionTypes.SET_ACCESS_TOKEN,
	  data
	};
}

// export function setRefreshToken(data) {
// 	return {
// 	  type: actionTypes.SET_REFRESH_TOKEN,
// 	  data
// 	};
// }

export function setAccessTokenExpiresIn(data) {
	return {
	  type: actionTypes.SET_ACCESS_TOKEN_EXPIRES_IN,
	  data
	};
}
