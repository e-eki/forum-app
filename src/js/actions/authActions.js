'use strict';

import * as actionTypes from './actionTypes';

// id юзера
export function setUserId(data) {
	return {
	  type: actionTypes.SET_USER_ID,
	  data
	};
}

// роль юзера
export function setUserRole(data) {
	return {
	  type: actionTypes.SET_USER_ROLE,
	  data
	};
}

// аксесс токен
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

// время жизни аксесс токена
export function setAccessTokenExpiresIn(data) {
	return {
	  type: actionTypes.SET_ACCESS_TOKEN_EXPIRES_IN,
	  data
	};
}
