'use strict';

// получить время в виде строки
export function getTimeString(dateValue) {
	let dateString = null;

	if (dateValue) {
		const date = (typeof(dateValue) === "string") ? new Date(dateValue) : dateValue;
		dateString = date.toLocaleTimeString();
	}

	return dateString;
};

// получить время и дату в виде строки
export function getDateTimeString(dateValue) {
	let dateString = null;

	if (dateValue) {
		const date = (typeof(dateValue) === "string") ? new Date(dateValue) : dateValue;
		dateString = `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
	}

	return dateString;
};

// получить дату в виде строки для инпута
export function getDateStringForInput(dateValue) {
	debugger;
	const date = new Date(dateValue);

	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	const dateString = `${year}-${month}-${day}`;

	return dateString;
}
