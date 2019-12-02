'use strict';

import axios from 'axios';
import Promise from 'bluebird';
import store from '../store/store';
import forumConst from '../constants/forumConst';
import { getChannelsByText } from './channelApi';
import { getMessagesByText } from './messageApi';

export function getSearchResults(text, searchType) {
	debugger;

	const tasks = [];

	switch (searchType) {

		case forumConst.searchTypes.channels:
			tasks.push(getChannelsByText(text));
			break;

		case forumConst.searchTypes.messages:
			tasks.push(getMessagesByText(text));
			break;

		default:    
			tasks.push(false); //?
			break;
	}

	return Promise.all(tasks)
		.then(results => {
			debugger;
			return results;
		});
}
