'use strict';

import * as actionTypes from './actionTypes';

// просматриваемый личный чат
export function setCurrentPrivateChannel(data) {
	return {
	  type: actionTypes.SET_CURRENT_PRIVATE_CHANNEL,
	  data
	};
}

// список личных чатов
export function setPrivateChannels(data) {
	return {
	  type: actionTypes.SET_PRIVATE_CHANNELS,
	  data
	};
}