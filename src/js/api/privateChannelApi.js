'use strict';

import axios from 'axios';
import Promise from 'bluebird';
import store from '../store/store';
import * as remoteActions from '../actions/remoteActions';
import apiConst from '../constants/apiConst';
import { getActualAccessToken } from '../api/authApi';

export function getPrivateChannels() {
	return Promise.resolve(true)
		.then(() => {
			return getActualAccessToken();
		})
		.then(accessToken => {
			const options = {
				method: 'GET',
				headers: { 'Authorization': `Token ${accessToken}` },
				url: `${apiConst.privateChannelApi}`
			};
			
			return axios(options);
		})
		.then(response => {
			debugger;
            return response.data;
		})
}

export function getPrivateChannelById(id) {
	return Promise.resolve(true)
		.then(() => {
			return getActualAccessToken();
		})
		.then(accessToken => {
			const options = {
				method: 'GET',
				headers: { 'Authorization': `Token ${accessToken}` },
				url: `${apiConst.privateChannelApi}/${id}`
			};
			
			return axios(options);
		})
		.then(response => {
			debugger;
		    return response.data;
		});
}

export function getPrivateChannelByRecipientId(recipientId) {
	debugger;

	return Promise.resolve(true)
		.then(() => {
			return getActualAccessToken();
		})
		.then(accessToken => {
			const options = {
				method: 'GET',
				headers: { 'Authorization': `Token ${accessToken}` },
				url: `${apiConst.privateChannelApi}?recipientId=${recipientId}`
			};
			
			return axios(options);
		})
		.then(response => {
			debugger;
			const tasks = [];

			if (response.data && response.data.length) {
				const privateChannel = response.data[0];
				
				tasks.push(privateChannel);
			}
			else {
				tasks.push(false);

				const newPrivateChannel = {
					recipientId: recipientId,
				};

				tasks.push(modifyPrivateChannel(newPrivateChannel));
			}

			return Promise.all(tasks);
		})
		.spread((privateChannel, privateChannelId) => {
			const tasks = [];

			if (privateChannel) {
				tasks.push(privateChannel);
			}
			else if (privateChannelId) {
				tasks.push(getPrivateChannelById(privateChannelId));
			}
			else {
				tasks.push(false);
			}

			return Promise.all(tasks);
		})
		.spread(privateChannel => {
			return privateChannel;
		})
}

export function deletePrivateChannel(item) {
	debugger;
	return Promise.resolve(true)
		.then(() => {
			return getActualAccessToken();
		})
		.then(accessToken => {
			const tasks = [];

			tasks.push(item.id);
			tasks.push(item.senderId);
			tasks.push(item.recipientId);

			const options = {
				method: 'DELETE',
				headers: { 'Authorization': `Token ${accessToken}` },
				url: `${apiConst.privateChannelApi}/${item.id}`
			};
			
			tasks.push(axios(options));

			return Promise.all(tasks);
		})
		.spread((privateChannelId, senderId, recipientId, response) => {
			store.dispatch(remoteActions.deletePrivateChannelById(privateChannelId, senderId, recipientId));

			return true;
		})
}

export function modifyPrivateChannel(item) {
	debugger;
	return Promise.resolve(true)
		.then(() => {
			return getActualAccessToken();
		})
		.then(accessToken => {
			const tasks = [];

			tasks.push(item.id);
			tasks.push(item.senderId);
			tasks.push(item.recipientId);

			const privateChannelData = {
				id: item.id,
				descriptionMessageId: item.descriptionMessageId,
				recipientId: item.recipientId,
			};

			if (item.id) {
				tasks.push(_updatePrivateChannel(privateChannelData, accessToken));
			}
			else {
				tasks.push(_createPrivateChannel(privateChannelData, accessToken));
			}
			
			return Promise.all(tasks);
		})
		.spread((privateChannelId, senderId, recipientId, response) => {
			debugger;
			if (!privateChannelId && response.data && response.data.id) {
				privateChannelId = response.data.id;
			}
			if (!senderId && response.data && response.data.senderId) {  //?
				senderId = response.data.senderId;
			}
			
			store.dispatch(remoteActions.updatePrivateChannelById(privateChannelId, senderId, recipientId));

			return privateChannelId;
		})
}


function _createPrivateChannel(privateChannelData, accessToken) {
	debugger;
	const options = {
		method: 'POST',
		headers: { 'Authorization': `Token ${accessToken}` },
		url: `${apiConst.privateChannelApi}`,
		data: privateChannelData,
	};
	
	return axios(options);
}

function _updatePrivateChannel(privateChannelData, accessToken) {
	debugger;
	const options = {
		method: 'PUT',
		headers: { 'Authorization': `Token ${accessToken}` },
		url: `${apiConst.privateChannelApi}/${privateChannelData.id}`,
		data: privateChannelData,
	};
	
	return axios(options);
}

