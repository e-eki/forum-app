'use strict';

import axios from 'axios';
import Promise from 'bluebird';
import store from '../store/store';
import * as remoteActions from '../actions/remoteActions';
import apiConst from '../constants/apiConst';
import { getActualAccessToken } from '../api/authApi';

export function getMessagesByText(searchText) {
	return axios.get(`${apiConst.messageApi}?searchText=${searchText}`)
		.then(response => {
			debugger;
		    return response.data;
		});
}

export function deleteMessage(item) {
	debugger;
	return Promise.resolve(true)
		.then(() => {
			return getActualAccessToken();
		})
		.then(accessToken => {
			if (item.parentItemId) {
				item.channelId = item.parentItemId;
				delete item.parentItemId;
			}

			const tasks = [];

			tasks.push(item.id);
			tasks.push(item.channelId);

			const options = {
				method: 'DELETE',
				headers: { 'Authorization': `Token ${accessToken}` },
				url: `${apiConst.messageApi}/${item.id}`
			};
			
			tasks.push(axios(options));

			return Promise.all(tasks);
		})
		.spread((messageId, channelId, response) => {
			debugger;
			store.dispatch(remoteActions.deleteMessageById(messageId, channelId));

			return true;
		});
}

export function modifyMessage(item) {
	debugger;
	return Promise.resolve(true)
		.then(() => {
			return getActualAccessToken();
		})
		.then(accessToken => {
			if (item.parentItemId) {
				item.channelId = item.parentItemId;
				delete item.parentItemId;
			}

			const tasks = [];

			tasks.push(item.id);
			tasks.push(item.channelId);
			tasks.push(item.recipientId);

			const messageData = {
				date: item.date,
				text: item.text,
				senderId: item.senderId,
				recipientId: item.recipientId,
				channelId: item.channelId,
			};

			if (item.id) {
				tasks.push(_updateMessage(messageData, accessToken));
			}
			else {
				tasks.push(_createMessage(messageData, accessToken));
			}
			
			return Promise.all(tasks);
		})
		.spread((messageId, channelId, recipientId, response) => {
			debugger;
			if (!messageId && response.data && response.data.id) {
				messageId = response.data.id;
			}
			
			store.dispatch(remoteActions.updateMessageById(messageId, channelId, recipientId));

			return true;
		})
}



function _createMessage(messageData, accessToken) {
	const options = {
		method: 'POST',
		headers: { 'Authorization': `Token ${accessToken}` },
		url: `${apiConst.messageApi}`,
		data: messageData,
	};
	
	return axios(options);
}

function _updateMessage(messageData, accessToken) {
	const options = {
		method: 'PUT',
		headers: { 'Authorization': `Token ${accessToken}` },
		url: `${apiConst.messageApi}/${item.id}`,
		data: messageData,
	};
	
	return axios(options);
}
