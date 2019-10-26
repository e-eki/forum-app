'use strict';

import * as actionTypes from './actionTypes';

export function setCurrentChannel(data) {
	return {
	  type: actionTypes.SET_CURRENT_CHANNEL,
	  data
	};
}