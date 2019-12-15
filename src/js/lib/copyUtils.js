'use strict';

export function copySection(sourse) {
	const result = copyBase(sourse);	

	result.name = sourse.name || '';
	result.description = sourse.description || '';
	result.subSections = sourse.subSections || [];
	result.senderId = sourse.senderId;
	result.orderNumber = sourse.orderNumber || null;

	return result;
};

export function copySubSection(sourse) {
	const result = copyBase(sourse);	

	result.name = sourse.name || '';
	result.description = sourse.description || '';
	result.sectionId = sourse.sectionId || '';
	result.channels = sourse.channels || [];
	result.senderId = sourse.senderId;
	result.orderNumber = sourse.orderNumber || null;

	return result;
};

export function copyChannel(sourse) {
	const result = copyChannelBase(sourse);	

	result.description = sourse.description || '';
	result.subSectionId = sourse.subSectionId || null;

	// result.name = sourse.name || '';
	// result.description = sourse.description || '';
	
	// result.senderId = sourse.senderId;
	// result.descriptionMessageId = sourse.descriptionMessageId || null;
	// result.descriptionMessage = sourse.descriptionMessage || null;
	// result.messages = sourse.messages || [];
	// result.lastMessage = sourse.lastMessage || null;
	// result.newMessagesCount = sourse.newMessagesCount || null;

	return result;
};

export function copyPrivateChannel(sourse) {
	const result = copyChannelBase(sourse);

	result.recipientId = sourse.recipientId || '';	

	// result.senderId = sourse.senderId || '';
	// result.recipientId = sourse.recipientId || '';
	// result.descriptionMessageId = sourse.descriptionMessageId || null;
	// result.descriptionMessage = sourse.descriptionMessage || null;
	// result.name = sourse.name || '';
	// result.messages = sourse.messages || [];
	// result.lastMessage = sourse.lastMessage || null;
	// result.newMessagesCount = sourse.newMessagesCount || null;

	return result;
};

export function copyMessage(sourse) {
	const result = copyBase(sourse);	

	result.text = sourse.text || '';
	result.date = sourse.date || null;
	result.channelId = sourse.channelId || null;
	result.senderId = sourse.senderId;
	result.recipientId = sourse.recipientId;

	return result;
};



function copyBase(sourse) {
	const result = new Object();  //let?

	result.id = sourse.id;

	return result;
}

function copyChannelBase(sourse) {
	const result = copyBase(sourse);	

	result.name = sourse.name || '';
	result.senderId = sourse.senderId || '';
	result.descriptionMessageId = sourse.descriptionMessageId || null;
	result.descriptionMessage = sourse.descriptionMessage || null;
	result.messages = sourse.messages || [];
	result.lastMessage = sourse.lastMessage || null;
	result.newMessagesCount = sourse.newMessagesCount || null;

	return result;
}
