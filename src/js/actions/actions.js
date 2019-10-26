'use strict';

import * as actionTypes from './actionTypes';

export function setSections(data) {
	return {
	  type: actionTypes.SET_SECTIONS,
	  data
	};
}

export function setCurrentSection(data) {
	return {
	  type: actionTypes.SET_CURRENT_SECTION,
	  data
	};
}

export function setCurrentSubSection(data) {
	return {
	  type: actionTypes.SET_CURRENT_SUBSECTION,
	  data
	};
}

export function setCurrentChannel(data) {
	return {
	  type: actionTypes.SET_CURRENT_CHANNEL,
	  data
	};
}

export function setUserInfo(data) {
	return {
	  type: actionTypes.SET_USER_INFO,
	  data
	};
}

