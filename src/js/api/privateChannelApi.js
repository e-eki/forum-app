'use strict';

import axios from 'axios';
import Promise from 'bluebird';
import store from '../store/store';
import * as sectionActions from '../actions/sectionActions';
import * as subSectionActions from '../actions/subSectionActions';
import * as channelActions from '../actions/channelActions';
import * as privateChannelActions from '../actions/privateChannelActions';
import * as remoteActions from '../actions/remoteActions';
import apiConst from '../constants/apiConst';

export function getPrivateChannelById(id) {
	return axios.get(`${apiConst.privateChannelApi}/${id}`)
		.then(response => {
			debugger;
			store.dispatch(privateChannelActions.setCurrentPrivateChannel(response.data));

		    return response.data;
		});
}

export function getPrivateChannelByRecipientId(userId) {
	debugger;

	return axios.get(`${apiConst.privateChannelApi}?recipientId=${userId}`)
		.then(response => {
			debugger;

			if (response.data) {
				const privateChannel = response.data;

				store.dispatch(privateChannelActions.setCurrentPrivateChannel(privateChannel));
				
				return privateChannel;
			}
			else {
				return createAndGetPrivateChannelByRecipientId(userId);
			}
		})
}

export function deletePrivateChannel(item) {
	debugger;
	const tasks = [];

	tasks.push(item.id);
	tasks.push(axios.delete(`${apiConst.privateChannelApi}/${item.id}`));

	return Promise.all(tasks)
		.spread((privateChannelId, response) => {
			store.dispatch(remoteActions.deletePrivateChannelById(privateChannelId));

			return true;
		})
}

export function modifyPrivateChannel(item) {
	debugger;
	const tasks = [];

	tasks.push(item.id);

	if (item.id) {
		tasks.push(updatePrivateChannel(item));
	}
	// else {
	// 	tasks.push(createPrivateChannel(item));
	// }
	
	return Promise.all(tasks)
		.spread((privateChannelId, response) => {
			debugger;
			if (!privateChannelId && response.data && response.data.id) {
				privateChannelId = response.data.id;
			}
			
			store.dispatch(remoteActions.updatePrivateChannelById(privateChannelId));  //?

			return true;
		})
}


// function setCurrentPrivateChannel(privateChannel) {
// 	debugger;
// 	store.dispatch(sectionActions.setCurrentSection(null));
// 	store.dispatch(subSectionActions.setCurrentSubSection(null));
// 	store.dispatch(sectionActions.setSections(null));
// 	store.dispatch(privateChannelActions.setCurrentPrivateChannel(privateChannel));
// 	store.dispatch(channelActions.setCurrentChannel(null));  //?
// }

function createPrivateChannel(userId) {
	return axios.post(`${apiConst.privateChannelApi}`, {
		recipientId: userId,
	})
}

function updatePrivateChannel(item) {
	return axios.put(`${apiConst.privateChannelApi}/${item.id}`, {
		descriptionMessageId: item.descriptionMessageId,
	})
}

function createAndGetPrivateChannelByRecipientId(userId) {
	return createPrivateChannel(userId)
		.then(response => {
			if (!response.data || !response.data.id) {
				return false;
			}

			const privateChannelId = response.data.id;

			return getPrivateChannelById(privateChannelId);
		})
}

