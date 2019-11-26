import axios from 'axios';
import store from '../store/store';
import * as actions from '../actions/privateChannelActions';
import apiConst from '../constants/apiConst';
import * as remoteActions from '../actions/remoteActions';


export function getPrivateChannelById(id) {
	return axios.get(`${apiConst.privateChannelApi}/${id}`)
		.then(response => {
			debugger;

			store.dispatch(sectionActions.setCurrentSection(null));
			store.dispatch(subSectionActions.setCurrentSubSection(null));
			store.dispatch(sectionActions.setSections(null));
			store.dispatch(channelActions.setCurrentChannel(response.data));  //!!!
			
		    return response.data;
		});
}

// export function getOrCreatePrivateChannel(item) {
// 	return axios.get(`${apiConst.privateChannelApi}?firstUserId=${item.firstUserId}&secondUserId=${item.secondUserId}`)
// 		.then(response => {
// 			debugger;

// 			const tasks = [];

// 			if (response.data) {
// 				tasks.push(response.data);
// 			}
// 			else {
// 				tasks.push(false);
// 				tasks.push(createPrivateChannel(item));
// 			}

// 		    return Promise.all(tasks);
// 		})
// 		.spread((data, response) => {
// 			if ()  //todo!
// 		})
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
	else {
		tasks.push(createPrivateChannel(item));
	}
	
	return Promise.all(tasks)
		.spread((privateChannelId, response) => {
			debugger;
			if (!privateChannelId && response.data && response.data.id) {  //?
				privateChannelId = response.data.id;
			}
			
			store.dispatch(remoteActions.updatePrivateChannelById(privateChannelId));  //?

			return true;
		})
}



function createPrivateChannel(item) {
	return axios.post(`${apiConst.privateChannelApi}`, {
		firstSenderId: item.firstSenderId,
		secondSenderId: item.secondSenderId,
	})
}

function updatePrivateChannel(item) {
	return axios.put(`${apiConst.privateChannelApi}/${item.id}`, {
		descriptionMessageId: item.descriptionMessageId,
	})
}

