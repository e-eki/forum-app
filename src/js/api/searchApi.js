'use strict';

import axios from 'axios';
import Promise from 'bluebird';
import store from '../store/store';
import forumConst from '../constants/forumConst';
import { getChannelsByText } from './channelApi';
import { getMessagesByText } from './messageApi';
import * as searchActions from '../actions/searchActions';

// поиск по указанному тексту в выбранном типе (чаты или сообщения)
export function getSearchResults(searchText, searchType) {
	debugger;
		
	const tasks = [];

	switch (searchType) {

		case forumConst.searchTypes.channels:
			tasks.push(getChannelsByText(searchText));
			break;

		case forumConst.searchTypes.messages:
			tasks.push(getMessagesByText(searchText));
			break;

		default:    
			tasks.push(false); //?
			break;
	}

	return Promise.all(tasks)
		.spread(results => {
			debugger;
			return results;
		});
}
