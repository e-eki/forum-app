'use strict';

export function getTimeString(dateValue) {
	let dateString = null;

	if (dateValue) {
		const date = (typeof(dateValue) === "string") ? new Date(dateValue) : dateValue;
		dateString = date.toLocaleTimeString();
	}

	return dateString;
};

export function getDateTimeString(dateValue) {
	let dateString = null;

	if (dateValue) {
		const date = (typeof(dateValue) === "string") ? new Date(dateValue) : dateValue;
		dateString = `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
	}

	return dateString;
};
