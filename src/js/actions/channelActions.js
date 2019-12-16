'use strict';

import * as actionTypes from './actionTypes';

export function setCurrentChannel(data) {
	return {
	  type: actionTypes.SET_CURRENT_CHANNEL,
	  data
	};
}

export function setCurrentInfoChannel(data) {
	return {
	  type: actionTypes.SET_CURRENT_INFO_CHANNEL,
	  data
	};
}

export function setModifiableChannel(data) {
	return {
	  type: actionTypes.SET_MODIFIABLE_CHANNEL,
	  data
	};
}

export function setMovingChannel(data) {
	return {
	  type: actionTypes.SET_MOVING_CHANNEL,
	  data
	};
}