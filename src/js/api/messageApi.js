'use strict';

import axios from 'axios';
import Promise from 'bluebird';
import store from '../store/store';
import * as actions from '../actions/messageActions';
import * as remoteActions from '../actions/remoteActions';
import apiConst from '../constants/apiConst';


// export function getMessageById(id) {
// 	return axios.get(`${apiConst.messageApi}/${id}`)  //??
// 		.then(response => {
// 			debugger;
// 		    store.dispatch(actions.setCurrentChannel(response));  //??
// 		    return response;
// 		});
// }

export function deleteMessage(item) {
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

	const tasks = [];

	tasks.push(item.id);
	tasks.push(item.channelId);

	if (item.id) {
		tasks.push(updateMessage(item));
	}
	else {
		debugger;
		
		item.channelId = item.parentItemId;
		delete item.parentItemId;  //??

		tasks.push(createMessage(item));
	}
	
	return Promise.all(tasks)
		.spread((messageId, channelId, response) => {
			debugger;
			store.dispatch(actions.setModifiableMessage(null));

			//store.dispatch(remoteActions.joinRoom(sectionId));  //??

			store.dispatch(remoteActions.updateMessageById(messageId, channelId));

			return true;
		})
}



function createMessage(item) {
	return axios.post(`${apiConst.messageApi}`, {
		date: item.date,
		text: item.text,
		//senderId: data.senderId,
		recipientId: item.recipientId,
		channelId: item.channelId,
	})
}

function updateMessage(item) {
	return axios.put(`${apiConst.messageApi}/${item.id}`, {
		date: item.date,
		text: item.text,
		//senderId: data.senderId,
		recipientId: item.recipientId,
		channelId: item.channelId,
	})
}
