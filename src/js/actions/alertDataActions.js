'use strict';

import * as actionTypes from './actionTypes';

// данные для окна с предупреждением
export function setAlertData(data) {
	return {
	  type: actionTypes.SET_ALERT_DATA,
	  data
	};
}
