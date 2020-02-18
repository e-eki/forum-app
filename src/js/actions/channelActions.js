'use strict';

import * as actionTypes from './actionTypes';

// просматриваемый чат
export function setCurrentChannel(data) {
	return {
	  type: actionTypes.SET_CURRENT_CHANNEL,
	  data
	};
}

// чат, информация которого открыта для просмотра
export function setCurrentInfoChannel(data) {
	return {
	  type: actionTypes.SET_CURRENT_INFO_CHANNEL,
	  data
	};
}

// чат, информация которого открыта для редактирования
export function setModifiableChannel(data) {
	return {
	  type: actionTypes.SET_MODIFIABLE_CHANNEL,
	  data
	};
}

// чат, местоположение которого на форуме редактируется
export function setMovingChannel(data) {
	return {
	  type: actionTypes.SET_MOVING_CHANNEL,
	  data
	};
}