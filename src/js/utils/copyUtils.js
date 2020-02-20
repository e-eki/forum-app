'use strict';

// копировать раздел
export function copySection(sourse) {
	const result = _copyBase(sourse);	

	result.name = sourse.name || '';
	result.description = sourse.description || '';
	result.subSections = sourse.subSections || [];
	result.senderId = sourse.senderId;
	result.orderNumber = sourse.orderNumber;

	return result;
};

// копировать подраздел
export function copySubSection(sourse) {
	const result = _copyBase(sourse);	

	result.name = sourse.name || '';
	result.description = sourse.description || '';
	result.sectionId = sourse.sectionId || '';
	result.channels = sourse.channels || [];
	result.senderId = sourse.senderId;
	result.orderNumber = sourse.orderNumber;
	result.parentSection = sourse.parentSection || null;

	return result;
};

// копировать чат
export function copyChannel(sourse) {
	const result = _copyChannelBase(sourse);	

	result.description = sourse.description || '';
	result.subSectionId = sourse.subSectionId || null;
	result.parentSection = sourse.parentSection || null;
	result.parentSubSection = sourse.parentSubSection || null;

	return result;
};

// копировать личный чат
export function copyPrivateChannel(sourse) {
	const result = _copyChannelBase(sourse);

	result.recipientId = sourse.recipientId || '';	

	return result;
};

// копировать сообщение
export function copyMessage(sourse) {
	const result = _copyBase(sourse);	

	result.text = sourse.text || '';
	result.date = sourse.date || null;
	result.channelId = sourse.channelId || null;
	result.senderId = sourse.senderId;
	result.senderName = sourse.senderName;
	result.recipientId = sourse.recipientId;

	return result;
};

// копировать информацию юзера
export function copyUserInfo(sourse) {
	const result = _copyBase(sourse);	

	result.userId = sourse.userId || null;
	result.login = sourse.login || '';
	result.birthDate = sourse.birthDate || null;
	result.city = sourse.city || '';
	result.profession = sourse.profession || '';
	result.hobby = sourse.hobby || '';
	result.captionText = sourse.captionText || '';
	result.role = sourse.role || null;
	result.inBlackList = sourse.inBlackList || false;

	return result;
};

// копировать общие поля для всех элементов
function _copyBase(sourse) {
	const result = new Object();

	result.id = sourse.id;
	result.canEdit = sourse.canEdit;
	result.canDelete = sourse.canDelete;
	result.canAdd = sourse.canAdd;

	return result;
}

// копировать общие поля для чата и личного чата
function _copyChannelBase(sourse) {
	const result = _copyBase(sourse);	

	result.name = sourse.name || '';
	result.senderId = sourse.senderId || '';
	result.descriptionMessageId = sourse.descriptionMessageId || null;
	result.descriptionMessage = sourse.descriptionMessage || null;
	result.messages = sourse.messages || [];
	result.lastMessage = sourse.lastMessage || null;
	result.newMessagesCount = sourse.newMessagesCount || null;

	return result;
}
