'use strict';

const copyUtils = new function() {

	this.copySection = function(sourse, result) {
		debugger;
		result.name = sourse.name;
		result.description = sourse.description;
		//result.senderId = sourse.senderId;

		return result;
	};

	this.copySubSection = function(sourse, result) {
		debugger;
		result.name = sourse.name;
		result.description = sourse.description;
		result.sectionId = sourse.sectionId;
		//result.senderId = sourse.senderId;

		return result;
	};

	this.copyChannel = function(sourse, result) {
		debugger;
		result.name = sourse.name;
		result.description = sourse.description;
		result.subSectionId = sourse.subSectionId;
		//result.senderId = sourse.senderId;
		result.descriptionMessageId = sourse.descriptionMessageId;

		return result;
	};

	this.copyMessage = function(sourse, result) {
		debugger;
		result.text = sourse.text;
		result.date = sourse.date;
		result.channelId = sourse.channelId;
		//result.senderId = sourse.senderId;
		//result.recipientId = sourse.recipientId;

		return result;
	};
};

module.exports = copyUtils;