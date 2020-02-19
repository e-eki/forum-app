'use strict';

import axios from 'axios';
import Promise from 'bluebird';
import store from '../store/store';
import * as remoteActions from '../actions/remoteActions';
import apiConst from '../constants/apiConst';
import { getActualAccessToken } from '../api/authApi';
import { showErrorMessage } from '../utils/baseUtils';

// получить список всех чатов (для списка чатов для перемещения сообщения)
export function getChannels() {
	return Promise.resolve(true)
		.then(() => {
			return getActualAccessToken()
				.catch(error => {
					debugger;
					return false;
				})
		})
		.then(accessToken => {
			const options = {
				method: 'GET',
				url: `${apiConst.channelApi}`
			};

			if (accessToken) {
				options.headers = { 'Authorization': `Token ${accessToken}` };
			}
			
			return axios(options);
		})
		.then(response => {
			debugger;
            return response.data;
		});
}

// получить список чатов, в названии или описании которых содержится данный текст
export function getChannelsByText(searchText) {
	return axios.get(`${apiConst.channelApi}?searchText=${searchText}`)
		.then(response => {
			debugger;
		    return response.data;
		});
}

// получить чат по его id
export function getChannelById(id) {
	return Promise.resolve(true)
		.then(() => {
			return getActualAccessToken()
				.catch(error => {
					debugger;
					return false;
				})
		})
		.then(accessToken => {
			const options = {
				method: 'GET',
				url: `${apiConst.channelApi}/${id}`
			};

			if (accessToken) {
				options.headers = { 'Authorization': `Token ${accessToken}` };
			}
			
			return axios(options);
		})
		.then(response => {
			debugger;
            return response.data;
		});
}

// удалить чат
export function deleteChannel(item) {
	debugger;
	return Promise.resolve(true)
		.then(() => {
			return getActualAccessToken();
		})
		.then(accessToken => {
			if (item.parentItemId) {
				item.subSectionId = item.parentItemId;
				delete item.parentItemId;
			}
		
			const tasks = [];
		
			tasks.push(item.id);
			tasks.push(item.subSectionId);

			const options = {
				method: 'DELETE',
				headers: { 'Authorization': `Token ${accessToken}` },
				url: `${apiConst.channelApi}/${item.id}`
			};
			
			tasks.push(axios(options));

			return Promise.all(tasks);
		})
		.spread((channelId, subSectionId, response) => {
			debugger;
			// отправляем на сервер событие об удалении чата
			store.dispatch(remoteActions.deleteChannelById(channelId, subSectionId));

			return true;
		})
		
}

// создание или редактирование чата
export function modifyChannel(item) {
	debugger;
	return Promise.resolve(true)
		.then(() => {
			return getActualAccessToken();
		})
		.then(accessToken => {
			if (item.parentItemId) {
				item.subSectionId = item.parentItemId;
				delete item.parentItemId;
			}

			const tasks = [];

			tasks.push(item.id);
			tasks.push(item.subSectionId);

			const channelData = {
				id: item.id,
				name: item.name,
				description: item.description,
				subSectionId: item.subSectionId,
				descriptionMessageId: item.descriptionMessageId,
			};

			if (item.id) {
				tasks.push(_updateChannel(channelData, accessToken));
			}
			else {
				tasks.push(_createChannel(channelData, accessToken));
			}
			
			return Promise.all(tasks);
		})
		.spread((channelId, subSectionId, response) => {
			debugger;
			if (!channelId && response.data && response.data.id) {
				channelId = response.data.id;
			}
			
			// отправляем на сервер событие об изменении чата
			store.dispatch(remoteActions.updateChannelById(channelId, subSectionId));

			return true;
		})
}


// создать чат
function _createChannel(channelData, accessToken) {
	const options = {
		method: 'POST',
		headers: { 'Authorization': `Token ${accessToken}` },
		url: `${apiConst.channelApi}`,
		data: channelData,
	};
	
	return axios(options);
}

// редактировать чат
function _updateChannel(channelData, accessToken) {
	const options = {
		method: 'PUT',
		headers: { 'Authorization': `Token ${accessToken}` },
		url: `${apiConst.channelApi}/${channelData.id}`,
		data: channelData,
	};
	
	return axios(options);
}
