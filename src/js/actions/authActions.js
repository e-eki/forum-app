'use strict';

import * as actionTypes from './actionTypes';

export function setAccessToken(data) {
	return {
	  type: actionTypes.SET_ACCESS_TOKEN,
	  data
	};
}

export function setRefreshToken(data) {
	return {
	  type: actionTypes.SET_REFRESH_TOKEN,
	  data
	};
}

export function setAccessTokenExpiresIn(data) {
	return {
	  type: actionTypes.SET_ACCESS_TOKEN_EXPIRES_IN,
	  data
	};
}
