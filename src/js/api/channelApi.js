'use strict';

import axios from 'axios';
import Promise from 'bluebird';
import store from '../store/store';
import * as channelActions from '../actions/channelActions';
import * as remoteActions from '../actions/remoteActions';
import apiConst from '../constants/apiConst';
import { getActualAccessToken } from '../api/authApi';

export function getChannels() {  //?
	return axios.get(`${apiConst.channelApi}`)
		.then(response => {
			debugger;
		    return response.data;
		});
}

export function getChannelsByText(searchText) {
	return axios.get(`${apiConst.channelApi}?searchText=${searchText}`)
		.then(response => {
			debugger;
		    return response.data;
		});
}

export function getChannelById(id) {
	return axios.get(`${apiConst.channelApi}/${id}`)
		.then(response => {
			debugger;
		    return response.data;
		});
}

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
		    //store.dispatch(channelActions.setCurrentInfoChannel(null));

			store.dispatch(remoteActions.deleteChannelById(channelId, subSectionId));

			return true;
		});
}

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
			
			//store.dispatch(channelActions.setModifiableChannel(null));

			store.dispatch(remoteActions.updateChannelById(channelId, subSectionId));

			return true;
		})
}



function _createChannel(channelData, accessToken) {
	const options = {
		method: 'POST',
		headers: { 'Authorization': `Token ${accessToken}` },
		url: `${apiConst.channelApi}`,
		data: channelData,
	};
	
	return axios(options);
}

function _updateChannel(channelData, accessToken) {
	const options = {
		method: 'PUT',
		headers: { 'Authorization': `Token ${accessToken}` },
		url: `${apiConst.channelApi}/${item.id}`,
		data: channelData,
	};
	
	return axios(options);
}
