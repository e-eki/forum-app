'use strict';

import * as actionTypes from './actionTypes';

export function setCurrentSubSection(data) {
	return {
	  type: actionTypes.SET_CURRENT_SUBSECTION,
	  data
	};
}

export function setCurrentInfoSubSection(data) {
	return {
	  type: actionTypes.SET_CURRENT_INFO_SUBSECTION,
	  data
	};
}

export function setModifiableSubSection(data) {
	return {
	  type: actionTypes.SET_MODIFIABLE_SUBSECTION,
	  data
	};
}

export function setMovingSubSection(data) {
	return {
	  type: actionTypes.SET_MOVING_SUBSECTION,
	  data
	};
}
