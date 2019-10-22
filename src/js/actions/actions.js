'use strict';

import * as actionTypes from './actionTypes';

export function setSections(sections) {
	return {
	  type: actionTypes.SET_SECTIONS,
	  sections
	};
}

