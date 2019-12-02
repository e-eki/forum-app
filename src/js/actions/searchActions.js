'use strict';

import * as actionTypes from './actionTypes';

export function setSearchChannels(data) {
	return {
	  type: actionTypes.SET_SEARCH_CHANNELS,
	  data
	};
}

export function setSearchMessages(data) {
	return {
	  type: actionTypes.SET_SEARCH_MESSAGES,
	  data
	};
}