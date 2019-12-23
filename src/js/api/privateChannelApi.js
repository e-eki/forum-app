'use strict';

import axios from 'axios';
import Promise from 'bluebird';
import store from '../store/store';
import * as remoteActions from '../actions/remoteActions';
import apiConst from '../constants/apiConst';
import { getUserInfoById } from './userInfoApi';

export function getPrivateChannels() {
	return axios.get(`${apiConst.privateChannelApi}`)
		.then(response => {
			debugger;
            return response.data;
		});
}

export function getPrivateChannelById(id) {
	return axios.get(`${apiConst.privateChannelApi}/${id}`)
		.then(response => {
			debugger;
		    return response.data;
		});
}

export function getPrivateChannelByRecipientId(recipientId) {
	debugger;

	return Promise.resolve(axios.get(`${apiConst.privateChannelApi}?recipientId=${recipientId}`))
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
					senderId: '5dd6d4c6d0412d25e4895fad',  //todo!
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
	const tasks = [];

	tasks.push(item.id);
	tasks.push(item.senderId);
	tasks.push(item.recipientId);

	tasks.push(axios.delete(`${apiConst.privateChannelApi}/${item.id}`));

	return Promise.all(tasks)
		.spread((privateChannelId, senderId, recipientId, response) => {
			store.dispatch(remoteActions.deletePrivateChannelById(privateChannelId, senderId, recipientId));

			return true;
		})
}

export function modifyPrivateChannel(item) {
	debugger;
	const tasks = [];

	tasks.push(item.id);
	tasks.push(item.senderId);
	tasks.push(item.recipientId);

	if (item.id) {
		tasks.push(updatePrivateChannel(item));
	}
	else {
		tasks.push(createPrivateChannel(item));
	}
	
	return Promise.all(tasks)
		.spread((privateChannelId, senderId, recipientId, response) => {
			debugger;
			if (!privateChannelId && response.data && response.data.id) {
				privateChannelId = response.data.id;
			}
			
			store.dispatch(remoteActions.updatePrivateChannelById(privateChannelId, senderId, recipientId));

			return privateChannelId;
		})
}


function createPrivateChannel(item) {
	debugger;

	return getUserInfoById(item.recipientId)
		.then(recipientUserInfo => {
			item.name = recipientUserInfo ? recipientUserInfo.login : 'NONAME';

			return axios.post(`${apiConst.privateChannelApi}`, {
				senderId: item.senderId,
				recipientId: item.recipientId,
				name: item.name,
			})
		})
}

function updatePrivateChannel(item) {
	debugger;
	return axios.put(`${apiConst.privateChannelApi}/${item.id}`, {
		descriptionMessageId: item.descriptionMessageId,
		name: item.name,
	})
}

