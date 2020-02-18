'use strict';

import * as actionTypes from './actionTypes';

// найденные чаты
export function setSearchChannels(data) {
	return {
	  type: actionTypes.SET_SEARCH_CHANNELS,
	  data
	};
}

// найденные сообщения
export function setSearchMessages(data) {
	return {
	  type: actionTypes.SET_SEARCH_MESSAGES,
	  data
	};
}

// текст, по которому поиск
export function setSearchText(data) {
	return {
	  type: actionTypes.SET_SEARCH_TEXT,
	  data
	};
}

// тип поиска (по чатам или по сообщениям)
export function setSearchType(data) {
	return {
	  type: actionTypes.SET_SEARCH_TYPE,
	  data
	};
}
