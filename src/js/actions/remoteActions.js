'use strict';

import * as actionTypes from './actionTypes';

//---ROOM

// присоединиться к комнате (с использованием сокетов на сервере)
export function joinRoom(id, roomType = null, userId = null) {
	return {
	  type: actionTypes.JOIN_ROOM,
	  roomId: id,
	  roomType: roomType,
	  userId: userId,
	  meta: {remote: true},
	};
}

// выйти из комнаты (с использованием сокетов на сервере)
export function leaveRoom(id, roomType = null, userId = null) {
	return {
	  type: actionTypes.LEAVE_ROOM,
	  roomId: id,
	  roomType: roomType,
	  userId: userId,
	  meta: {remote: true},
	};
}

//---SECTION

// добавление или редактирование раздела
export function updateSectionById(sectionId) {
	return {
	  type: actionTypes.UPDATE_SECTION_BY_ID,
	  sectionId: sectionId,
	  meta: {remote: true},
	};
}

// удаление раздела
export function deleteSectionById(sectionId) {
	return {
	  type: actionTypes.DELETE_SECTION_BY_ID,
	  sectionId: sectionId,
	  meta: {remote: true},
	};
}

//---SUBSECTION

// добавление или редактирование подраздела
export function updateSubSectionById(subSectionId, sectionId) {
	return {
	  type: actionTypes.UPDATE_SUBSECTION_BY_ID,
	  subSectionId: subSectionId,
	  sectionId: sectionId,
	  meta: {remote: true},
	};
}

// удаление подраздела
export function deleteSubSectionById(subSectionId, sectionId) {
	return {
	  type: actionTypes.DELETE_SUBSECTION_BY_ID,
	  subSectionId: subSectionId,
	  sectionId: sectionId,
	  meta: {remote: true},
	};
}

//---CHANNEL

// добавление или редактирование чата
export function updateChannelById(channelId, subSectionId) {
	return {
	  type: actionTypes.UPDATE_CHANNEL_BY_ID,
	  channelId: channelId,
	  subSectionId: subSectionId,
	  meta: {remote: true},
	};
}

// удаление чата
export function deleteChannelById(channelId, subSectionId) {
	return {
	  type: actionTypes.DELETE_CHANNEL_BY_ID,
	  channelId: channelId,
	  subSectionId: subSectionId,
	  meta: {remote: true},
	};
}

//---MESSAGE

// добавление или редактирование сообщения
export function updateMessageById(messageId, channelId, recipientId) {
	return {
	  type: actionTypes.UPDATE_MESSAGE_BY_ID,
	  messageId: messageId,
	  channelId: channelId,
	  recipientId: recipientId,
	  meta: {remote: true},
	};
}

// удаление сообщения
export function deleteMessageById(messageId, channelId) {
	return {
	  type: actionTypes.DELETE_MESSAGE_BY_ID,
	  messageId: messageId,
	  channelId: channelId,
	  meta: {remote: true},
	};
}

//---PRIVATE-CHANNEL

// добавление или редактирование личного чата
export function updatePrivateChannelById(privateChannelId, senderId, recipientId) {
	return {
	  type: actionTypes.UPDATE_PRIVATE_CHANNEL_BY_ID,
	  privateChannelId: privateChannelId,
	  senderId: senderId,
	  recipientId: recipientId,
	  meta: {remote: true},
	};
}

// удаление личного чата
export function deletePrivateChannelById(privateChannelId, senderId, recipientId) {
	return {
	  type: actionTypes.DELETE_PRIVATE_CHANNEL_BY_ID,
	  privateChannelId: privateChannelId,
	  senderId: senderId,
	  recipientId: recipientId,
	  meta: {remote: true},
	};
}

//---USER

// редактирование данных юзера
export function updateUser(userId, senderId) {  //?
	return {
	  type: actionTypes.UPDATE_USER,
	  userId: userId,
	  senderId: senderId,
	  meta: {remote: true},
	};
}

