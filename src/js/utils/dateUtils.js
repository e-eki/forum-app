'use strict';

export function getDateStringForInput(dateValue) {
	debugger;
	const date = new Date(dateValue);

	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	const dateString = `${year}-${month}-${day}`;

	return dateString;
}

