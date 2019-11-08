'use strict';

import axios from 'axios';
import Promise from 'bluebird';
import store from '../store/store';
import * as actions from '../actions/channelActions';
import * as remoteActions from '../actions/remoteActions';
import apiConst from '../constants/apiConst';


export function getChannelById(id) {
	return axios.get(`${apiConst.channelApi}/${id}`)
		.then(response => {
			debugger;
		    store.dispatch(actions.setCurrentChannel(response));  //??
		    return response;
		});
}

export function deleteChannel(item) {
	const tasks = [];

	tasks.push(item.id);
	tasks.push(item.subSectionId);
	tasks.push(axios.delete(`${apiConst.channelApi}/${item.id}`));

	return Promise.all(tasks)
		.spread((channelId, subSectionId, response) => {
			debugger;
		    store.dispatch(actions.setCurrentInfoChannel(null));

			store.dispatch(remoteActions.deleteChannelById(channelId, subSectionId));
		});
}

export function modifyChannel(item) {
	debugger;

	const tasks = [];

	tasks.push(item.id);
	tasks.push(item.subSectionId);

	if (item.id) {
		tasks.push(updateChannel(item));
	}
	else {
		debugger;
		
		item.subSectionId = item.parentItemId;
		delete item.parentItemId;  //??

		tasks.push(createChannel(item));
	}
	
	return Promise.all(tasks)
		.spread((channelId, subSectionId, response) => {
			debugger;
			store.dispatch(actions.setModifiableChannel(null));

			//store.dispatch(remoteActions.joinRoom(sectionId));  //??

			store.dispatch(remoteActions.updateChannelById(channelId, subSectionId));

			return true;
		})
}



function createChannel(item) {
	return axios.post(`${apiConst.channelApi}`, {
		name: item.name,
		description: item.description,
		subSectionId: item.subSectionId,
	})
}

function updateChannel(item) {
	return axios.put(`${apiConst.channelApi}/${item.id}`, {
		name: item.name,
		description: item.description,
		subSectionId: item.subSectionId,
	})
}
