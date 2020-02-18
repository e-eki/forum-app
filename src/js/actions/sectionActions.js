'use strict';

import * as actionTypes from './actionTypes';

// список разделов
export function setSections(data) {
	return {
	  type: actionTypes.SET_SECTIONS,
	  data
	};
}

// просматриваемый раздел
export function setCurrentSection(data) {
	return {
	  type: actionTypes.SET_CURRENT_SECTION,
	  data
	};
}

// раздел, информация которого открыта для просмотра
export function setCurrentInfoSection(data) {
	return {
	  type: actionTypes.SET_CURRENT_INFO_SECTION,
	  data
	};
}

// раздел, информация которого открыта для редактирования
export function setModifiableSection(data) {
	return {
	  type: actionTypes.SET_MODIFIABLE_SECTION,
	  data
	};
}

// раздел, местоположение которого на форуме редактируется
export function setMovingSection(data) {
	return {
	  type: actionTypes.SET_MOVING_SECTION,
	  data
	};
}
