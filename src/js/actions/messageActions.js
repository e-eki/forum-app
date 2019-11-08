'use strict';

import * as actionTypes from './actionTypes';

export function setCurrentInfoMessage(data) {
	return {
	  type: actionTypes.SET_CURRENT_INFO_MESSAGE,
	  data
	};
}

export function setModifiableMessage(data) {
	return {
	  type: actionTypes.SET_MODIFIABLE_MESSAGE,
	  data
	};
}