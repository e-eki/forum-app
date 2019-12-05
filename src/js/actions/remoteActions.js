'use strict';

import * as actionTypes from './actionTypes';

//---ROOM

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

//---SECTION

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

//---SUBSECTION

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

//---CHANNEL

export function updateChannelById(channelId, subSectionId) {
	return {
	  type: actionTypes.UPDATE_CHANNEL_BY_ID,
	  channelId: channelId,
	  subSectionId: subSectionId,
	  meta: {remote: true},
	};
}

export function deleteChannelById(channelId, subSectionId) {
	return {
	  type: actionTypes.DELETE_CHANNEL_BY_ID,
	  channelId: channelId,
	  subSectionId: subSectionId,
	  meta: {remote: true},
	};
}

//---MESSAGE

export function updateMessageById(messageId, channelId, recipientId) {
	return {
	  type: actionTypes.UPDATE_MESSAGE_BY_ID,
	  messageId: messageId,
	  channelId: channelId,
	  recipientId: recipientId,
	  meta: {remote: true},
	};
}

export function deleteMessageById(messageId, channelId) {
	return {
	  type: actionTypes.DELETE_MESSAGE_BY_ID,
	  messageId: messageId,
	  channelId: channelId,
	  meta: {remote: true},
	};
}

//---PRIVATE-CHANNEL

export function updatePrivateChannelById(privateChannelId, senderId, recipientId) {
	return {
	  type: actionTypes.UPDATE_PRIVATE_CHANNEL_BY_ID,
	  privateChannelId: privateChannelId,
	  senderId: senderId,
	  recipientId: recipientId,
	  meta: {remote: true},
	};
}

export function deletePrivateChannelById(privateChannelId, senderId, recipientId) {
	return {
	  type: actionTypes.DELETE_PRIVATE_CHANNEL_BY_ID,
	  privateChannelId: privateChannelId,
	  senderId: senderId,
	  recipientId: recipientId,
	  meta: {remote: true},
	};
}

