'use strict';

import * as actionTypes from './actionTypes';

// просматриваемая информация юзера
export function setCurrentUserInfo(data) {
	return {
	  type: actionTypes.SET_CURRENT_USER_INFO,
	  data
	};
}

// информация юзера, которая открыта для редактирования
export function setModifiableUserInfo(data) {
	return {
	  type: actionTypes.SET_MODIFIABLE_USER_INFO,
	  data
	};
}