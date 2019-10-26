'use strict';

import * as actionTypes from './actionTypes';

export function setCurrentSubSection(data) {
	return {
	  type: actionTypes.SET_CURRENT_SUBSECTION,
	  data
	};
}