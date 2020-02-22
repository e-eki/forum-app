'use strict';

import * as actionTypes from './actionTypes';

// цветовая тема оформления (день/ночь)
export function setColorTheme(data) {
	return {
	  type: actionTypes.SET_COLOR_THEME,
	  data
	};
}
