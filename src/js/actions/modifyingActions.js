'use strict';

import * as actionTypes from './actionTypes';

export function setParentItemsList(data) {
	return {
	  type: actionTypes.SET_PARENT_ITEMS_LIST,
	  data
	};
}


