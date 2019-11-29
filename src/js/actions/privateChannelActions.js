'use strict';

import * as actionTypes from './actionTypes';

export function setCurrentPrivateChannel(data) {
	return {
	  type: actionTypes.SET_CURRENT_PRIVATE_CHANNEL,
	  data
	};
}

export function setPrivateChannels(data) {
	return {
	  type: actionTypes.SET_PRIVATE_CHANNELS,
	  data
	};
}