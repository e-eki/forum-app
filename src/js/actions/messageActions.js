'use strict';

import * as actionTypes from './actionTypes';

// чат, информация которого открыта для просмотра
export function setCurrentInfoMessage(data) {
	return {
	  type: actionTypes.SET_CURRENT_INFO_MESSAGE,
	  data
	};
}

// чат, информация которого открыта для редактирования
export function setModifiableMessage(data) {
	return {
	  type: actionTypes.SET_MODIFIABLE_MESSAGE,
	  data
	};
}

// чат, местоположение которого на форуме редактируется
export function setMovingMessage(data) {
	return {
	  type: actionTypes.SET_MOVING_MESSAGE,
	  data
	};
}