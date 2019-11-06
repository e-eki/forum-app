'use strict';

import axios from 'axios';
import Promise from 'bluebird';
import store from '../store/store';
import * as actions from '../actions/subSectionActions';
import * as remoteActions from '../actions/remoteActions';
import apiConst from '../constants/apiConst';


export function getSubSectionById(id) {
	return axios.get(`${apiConst.subSectionApi}/${id}`)
		.then(response => {
			debugger;
		    store.dispatch(actions.setCurrentSubSection(response));  //??
		    return response;
		});
}

export function deleteSubSection(id) {
	return axios.delete(`${apiConst.subSectionApi}/${id}`)  //??
		.then(response => {
			debugger;
		    store.dispatch(actions.setCurrentInfoSubSection(null));

			store.dispatch(remoteActions.updateSubSections());
		});
}

export function modifySubSection(item) {
	debugger;

	const tasks = [];

	tasks.push(item.sectionId);

	if (item.id) {
		tasks.push(updateSubSection(item));
	}
	else {
		item.sectionId = item.parentItemId;
		delete item.parentItemId;

		tasks.push(createSubSection(item));
	}
	
	return Promise.all(tasks)
		.spread((sectionId, response) => {
			debugger;
			store.dispatch(actions.setModifiableSubSection(null));

			//store.dispatch(remoteActions.joinRoom('1'));  //todo

			store.dispatch(remoteActions.updateSubSections(sectionId));

			return true;
		})
}



function createSubSection(item) {
	return axios.post(`${apiConst.subSectionApi}`, {
		name: item.name,
		description: item.description,
	})
}

function updateSubSection(item) {
	return axios.put(`${apiConst.subSectionApi}/${item.id}`, {
		name: item.name,
		description: item.description,
	})
}
