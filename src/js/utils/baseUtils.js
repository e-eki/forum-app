'use strict';

import store from '../store/store';
import { setAlertData } from '../actions/alertDataActions';

// получить сообщение об ошибке
export function getErrorResponseMessage(error) {
	debugger;
	let message = '';

	if (error.response && error.response.data) {
		message = error.response.data;
	}
	else if (error.message) {
		message = error.message;
	}
	// else if (error.data && error.data.message) {  //???
	// 	message = error.data.message;
	// }
	else if (error.status === 500) {
		message = 'Internal server error';
	}
	else {
		message = 'Some client error';  //?
	}

	return message;
}

// показать сообщение об ошибке
export function showErrorMessage(error) {
	debugger;

	const message = getErrorResponseMessage(error);

	const alertData = {
		message: message,
	};

	store.dispatch(setAlertData(alertData));
}
