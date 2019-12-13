'use strict';

import axios from 'axios';
import Promise from 'bluebird';
import store from '../store/store';
import * as channelActions from '../actions/channelActions';
import * as remoteActions from '../actions/remoteActions';
import apiConst from '../constants/apiConst';


export function getChannelsByText(searchText) {
	return axios.get(`${apiConst.channelApi}?searchText=${searchText}`)
		.then(response => {
			debugger;
			// store.dispatch(setSearchChannels(response.data));

		    return response.data;
		});
}

export function getChannelById(id) {
	return axios.get(`${apiConst.channelApi}/${id}`)
		.then(response => {
			debugger;
			//store.dispatch(channelActions.setCurrentChannel(response.data));
			
		    return response.data;
		});
}

export function deleteChannel(item) {
	debugger;
	if (item.parentItemId) {
		item.subSectionId = item.parentItemId;
		delete item.parentItemId;
	}

	const tasks = [];

	tasks.push(item.id);
	tasks.push(item.subSectionId);
	tasks.push(axios.delete(`${apiConst.channelApi}/${item.id}`));

	return Promise.all(tasks)
		.spread((channelId, subSectionId, response) => {
			debugger;

		    store.dispatch(channelActions.setCurrentInfoChannel(null));

			store.dispatch(remoteActions.deleteChannelById(channelId, subSectionId));
		});
}

export function modifyChannel(item) {
	debugger;
	if (item.parentItemId) {
		item.subSectionId = item.parentItemId;
		delete item.parentItemId;
	}

	const tasks = [];

	tasks.push(item.id);
	tasks.push(item.subSectionId);

	item.senderId = item.subSectionId;  //todo!

	if (item.id) {
		tasks.push(updateChannel(item));
	}
	else {
		tasks.push(createChannel(item));
	}
	
	return Promise.all(tasks)
		.spread((channelId, subSectionId, response) => {
			debugger;
			if (!channelId && response.data && response.data.id) {
				channelId = response.data.id;
			}
			
			store.dispatch(channelActions.setModifiableChannel(null));

			store.dispatch(remoteActions.updateChannelById(channelId, subSectionId));

			return true;
		})
}



function createChannel(item) {
	return axios.post(`${apiConst.channelApi}`, {
		name: item.name,
		description: item.description,
		subSectionId: item.subSectionId,
		descriptionMessageId: item.descriptionMessageId,
	})
}

function updateChannel(item) {
	return axios.put(`${apiConst.channelApi}/${item.id}`, {
		name: item.name,
		description: item.description,
		subSectionId: item.subSectionId,
		descriptionMessageId: item.descriptionMessageId,
	})
}
