'use strict';

import * as actionTypes from './actionTypes';

export function setAlertMessage(data) {
	return {
	  type: actionTypes.SET_ALERT_MESSAGE,
	  data
	};
}
