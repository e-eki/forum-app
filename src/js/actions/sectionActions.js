'use strict';

import * as actionTypes from './actionTypes';

export function setSections(data) {
	return {
	  type: actionTypes.SET_SECTIONS,
	  data
	};
}

export function setCurrentSection(data) {
	return {
	  type: actionTypes.SET_CURRENT_SECTION,
	  data
	};
}

export function setModifiableSection(data) {
	return {
	  type: actionTypes.SET_MODIFIABLE_SECTION,
	  data
	};
}

export function updateSections() {
	return {
	  type: actionTypes.UPDATE_SECTIONS,
	  meta: {remote: true},
	};
}