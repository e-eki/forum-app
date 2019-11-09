'use strict';

export function copySection(sourse, result) {
	debugger;
	result.name = sourse.name;
	result.description = sourse.description;
	//result.senderId = sourse.senderId;

	return result;
};

export function copySubSection(sourse, result) {
	debugger;
	result.name = sourse.name;
	result.description = sourse.description;
	result.sectionId = sourse.sectionId;
	//result.senderId = sourse.senderId;

	return result;
};

export function copyChannel(sourse, result) {
	debugger;
	result.name = sourse.name;
	result.description = sourse.description;
	result.subSectionId = sourse.subSectionId;
	//result.senderId = sourse.senderId;
	result.descriptionMessageId = sourse.descriptionMessageId;

	return result;
};

export function copyMessage(sourse, result) {
	debugger;
	result.text = sourse.text;
	result.date = sourse.date;
	result.channelId = sourse.channelId;
	//result.senderId = sourse.senderId;
	//result.recipientId = sourse.recipientId;

	return result;
};
