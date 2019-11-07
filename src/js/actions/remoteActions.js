'use strict';

import * as actionTypes from './actionTypes';

// export function updateSections() {
// 	return {
// 	  type: actionTypes.UPDATE_SECTIONS,
// 	  meta: {remote: true},
// 	};
// }

export function updateSectionById(sectionId) {
	return {
	  type: actionTypes.UPDATE_SECTION_BY_ID,
	  sectionId: sectionId,
	  meta: {remote: true},
	};
}

export function deleteSectionById(sectionId) {
	return {
	  type: actionTypes.DELETE_SECTION_BY_ID,
	  sectionId: sectionId,
	  meta: {remote: true},
	};
}

//-----

export function updateSubSectionById(subSectionId, sectionId) {
	return {
	  type: actionTypes.UPDATE_SUBSECTION_BY_ID,
	  subSectionId: subSectionId,
	  sectionId: sectionId,
	  meta: {remote: true},
	};
}

export function deleteSubSectionById(subSectionId, sectionId) {
	return {
	  type: actionTypes.DELETE_SUBSECTION_BY_ID,
	  subSectionId: subSectionId,
	  sectionId: sectionId,
	  meta: {remote: true},
	};
}

//------

export function updateChannelById(channelId, subSectionId) {
	return {
	  type: actionTypes.UPDATE_SUBSECTION_BY_ID,
	  channelId: channelId,
	  subSectionId: subSectionId,
	  meta: {remote: true},
	};
}

export function deleteChannelById(channelId, subSectionId) {
	return {
	  type: actionTypes.DELETE_SUBSECTION_BY_ID,
	  channelId: channelId,
	  subSectionId: subSectionId,
	  meta: {remote: true},
	};
}

//--------

export function joinRoom(id) {
	return {
	  type: actionTypes.JOIN_ROOM,
	  roomId: id,
	  meta: {remote: true},
	};
}

export function leaveRoom(id) {
	return {
	  type: actionTypes.LEAVE_ROOM,
	  roomId: id,
	  meta: {remote: true},
	};
}