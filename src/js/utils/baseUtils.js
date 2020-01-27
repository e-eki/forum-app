'use strict';

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
		message = 'Some error';  //?
	}

	return message;
}
