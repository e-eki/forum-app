'use strict';

import axios from 'axios';
import Promise from 'bluebird';
import store from '../store/store';
import * as remoteActions from '../actions/remoteActions';
import apiConst from '../constants/apiConst';
import { getActualAccessToken } from '../api/authApi';

// получить список сообщений, в тексте которых содержится данный текст
export function getMessagesByText(searchText) {
	return axios.get(`${apiConst.messageApi}?searchText=${searchText}`)
		.then(response => {
			debugger;
		    return response.data;
		});
}

// удалить сообщение
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

			// отправляем на сервер событие об удалении сообщения
			store.dispatch(remoteActions.deleteMessageById(messageId, channelId));

			return true;
		});
}

// создание или редактирование сообщения
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
				id: item.id,
				//date: item.date,
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
			
			// отправляем на сервер событие об изменении сообщения
			store.dispatch(remoteActions.updateMessageById(messageId, channelId, recipientId));

			return true;
		})
}


// создать сообщение
function _createMessage(messageData, accessToken) {
	const options = {
		method: 'POST',
		headers: { 'Authorization': `Token ${accessToken}` },
		url: `${apiConst.messageApi}`,
		data: messageData,
	};
	
	return axios(options);
}

// редактировать сообщение
function _updateMessage(messageData, accessToken) {
	const options = {
		method: 'PUT',
		headers: { 'Authorization': `Token ${accessToken}` },
		url: `${apiConst.messageApi}/${messageData.id}`,
		data: messageData,
	};
	
	return axios(options);
}
