'use strict';

import forumConst from '../constants/forumConst';
import { modifyChannel } from '../api/channelApi';
import { modifyPrivateChannel } from '../api/privateChannelApi';

export function setDescriptionMessageForChannel(itemType, message, channel) {
	debugger;

	if (message && message.id) {
		channel.descriptionMessageId = message.id;
	}
	else {
		channel.descriptionMessageId = null;
	}

	if (itemType === forumConst.itemTypes.channel) {
		return modifyChannel(channel);
	}
	else {
		return modifyPrivateChannel(channel);
	}
}


