'use strict';

import * as actionTypes from './actionTypes';

export function setSections(sections) {
	return {
	  type: actionTypes.SET_SECTIONS,
	  sections
	};
}

export function setCurrentSection(section) {
	return {
	  type: actionTypes.SET_CURRENT_SECTION,
	  section
	};
}

export function setCurrentSubSection(subSection) {
	return {
	  type: actionTypes.SET_CURRENT_SUBSECTION,
	  subSection
	};
}

export function setCurrentChannel(channel) {
	return {
	  type: actionTypes.SET_CURRENT_CHANNEL,
	  channel
	};
}

