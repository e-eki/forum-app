'use strict';

export function getDateString(date) {
	let dateString = null;

	if (date) {
		dateString = (typeof(date) === "string") ? new Date(date).toLocaleTimeString() : date.toLocaleTimeString();
	}

	return dateString;
};
