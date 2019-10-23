'use strict';

import * as actionTypes from './actionTypes';

export function setSections(sections) {
	return {
	  type: actionTypes.SET_SECTIONS,
	  sections
	};
}

export function setCurrentSection(section) {
	return {
	  type: actionTypes.SET_CURRENT_SECTION,
	  section
	};
}

