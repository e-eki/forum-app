'use strict';

import authConst from '../constants/authConst';

export function isEmailValid(email) {   //?
	var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return emailRegex.test(String(email).toLowerCase());
};

export function getErrorResponseMessage(error) {
	debugger;
	if (error.response) error = error.response;

	if (!error.status) {
		error.status = 500;
	}

	let message;

	switch (error.status) {
		/*case 200:
		case 201:
		case 204:
			break;*/

		case 400: 
			message = 'Некорректные данные: ';
			break;

		case 401: 
			message = 'Ошибка авторизации: ';
			break;

		case 403: 
			message = 'Ошибка доступа: ';
			break;	

		case 404: 
			message = 'Ресурс не найден: ';
			break;	

		case 500: 
			message = 'Internal server error: ';
			break;	

		default:
			message = 'Internal server error: ';  //?
			break;	
	};

	if (error.data && error.data.message) {
		message += error.data.message;
	}
	else if (error.message) {
		message += error.message;
	}
	
	//todo: для многих сообщений

	// if (error.data && error.data.data && error.data.data.length) {  //?
	// 	const errorData = error.data.data;
	// 	message += ': ';
	// 	errorData.forEach(element => {
	// 		if (typeof(element) === 'string') {
	// 			message += element + ',';
	// 		}
	// 	});
	// }

	return message;
}

