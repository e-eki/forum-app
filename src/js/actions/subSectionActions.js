'use strict';

import * as actionTypes from './actionTypes';

// просматриваемый подраздел
export function setCurrentSubSection(data) {
	return {
	  type: actionTypes.SET_CURRENT_SUBSECTION,
	  data
	};
}

// подраздел, информация которого открыта для просмотра
export function setCurrentInfoSubSection(data) {
	return {
	  type: actionTypes.SET_CURRENT_INFO_SUBSECTION,
	  data
	};
}

// подраздел, информация которого открыта для редактирования
export function setModifiableSubSection(data) {
	return {
	  type: actionTypes.SET_MODIFIABLE_SUBSECTION,
	  data
	};
}

// подраздел, местоположение которого на форуме редактируется
export function setMovingSubSection(data) {
	return {
	  type: actionTypes.SET_MOVING_SUBSECTION,
	  data
	};
}
