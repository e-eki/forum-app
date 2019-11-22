'use strict';

import * as actionTypes from './actionTypes';

export function setAlertData(data) {
	return {
	  type: actionTypes.SET_ALERT_DATA,
	  data
	};
}
