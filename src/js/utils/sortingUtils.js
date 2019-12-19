'use strict';

// сортировка чатов по дате последнего сообщения
export function getSortedItemsByOrderNumber(items) {
	debugger;
	const sortedItems = items.sort((item0, item1) => {
		const value0 = item0.orderNumber || null;   //?
		const value1 = item1.orderNumber || null;   //?

		if (value0 > value1) return 1;
		if (value0 === value1) return 0;
		if (value0 < value1) return -1;
	});
	
	return sortedItems;
};

