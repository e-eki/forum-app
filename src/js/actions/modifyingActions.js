'use strict';

import * as actionTypes from './actionTypes';

// список родительских элементов для перемещения элемента внутри них
export function setParentItemsList(data) {
	return {
	  type: actionTypes.SET_PARENT_ITEMS_LIST,
	  data
	};
}


