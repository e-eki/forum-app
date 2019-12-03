'use strict';

import axios from 'axios';
import Promise from 'bluebird';
import store from '../store/store';
import * as actions from '../actions/messageActions';
import * as remoteActions from '../actions/remoteActions';
import apiConst from '../constants/apiConst';
import { setSearchMessages } from '../actions/searchActions';


// export function getMessageById(id) {
// 	return axios.get(`${apiConst.messageApi}/${id}`)  //??
// 		.then(response => {
// 			debugger;
// 		    store.dispatch(actions.setCurrentChannel(response.data));  //??
// 		    return response.data;
// 		});
// }

export function getMessagesByText(searchText) {
	return axios.get(`${apiConst.messageApi}?searchText=${searchText}`)
		.then(response => {
			debugger;
			store.dispatch(setSearchMessages(response.data));

		    return response.data;
		});
}

export function deleteMessage(item) {
	debugger;
	if (item.parentItemId) {
		item.channelId = item.parentItemId;
		delete item.parentItemId;
	}

	const tasks = [];

	tasks.push(item.id);
	tasks.push(item.channelId);
	tasks.push(axios.delete(`${apiConst.messageApi}/${item.id}`));

	return Promise.all(tasks)
		.spread((messageId, channelId, response) => {
			debugger;
		    store.dispatch(actions.setCurrentInfoMessage(null));

			store.dispatch(remoteActions.deleteMessageById(messageId, channelId));
		});
}

export function modifyMessage(item) {
	debugger;
	if (item.parentItemId) {
		item.channelId = item.parentItemId;
		delete item.parentItemId;
	}

	const tasks = [];

	tasks.push(item.id);
	tasks.push(item.channelId);

	item.senderId = item.channelId;  //todo!

	if (item.id) {
		tasks.push(updateMessage(item));
	}
	else {
		tasks.push(createMessage(item));
	}
	
	return Promise.all(tasks)
		.spread((messageId, channelId, response) => {
			debugger;
			if (!messageId && response.data && response.data.id) {
				messageId = response.data.id;
			}

			store.dispatch(actions.setModifiableMessage(null));

			store.dispatch(remoteActions.updateMessageById(messageId, channelId));

			return true;
		})
}



function createMessage(item) {
	return axios.post(`${apiConst.messageApi}`, {
		date: item.date,
		text: item.text,
		senderId: item.senderId,
		recipientId: item.recipientId,
		channelId: item.channelId,
	})
}

function updateMessage(item) {
	return axios.put(`${apiConst.messageApi}/${item.id}`, {
		date: item.date,
		text: item.text,
		senderId: item.senderId,
		recipientId: item.recipientId,
		channelId: item.channelId,
	})
}
