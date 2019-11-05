'use strict';

import * as actionTypes from './actionTypes';

export function updateSections() {
	return {
	  type: actionTypes.UPDATE_SECTIONS,
	  meta: {remote: true},
	};
}

export function joinRoom(id) {
	return {
	  type: actionTypes.JOIN_ROOM,
	  roomId: id,
	  meta: {remote: true},
	};
}