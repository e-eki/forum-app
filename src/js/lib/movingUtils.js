'use strict';

import forumConst from '../constants/forumConst';

export function getMovedItemsInList(items, item, movingInListType) {
	debugger;
	const itemIndex = items.indexOf(item);

	if (movingInListType === forumConst.movingInListTypes.up) {
		if (item.orderNumber > 0) {
			item.orderNumber--;
		}
		 
	}
};
