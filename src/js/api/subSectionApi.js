'use strict';

import axios from 'axios';
import Promise from 'bluebird';
import store from '../store/store';
import * as subSectionActions from '../actions/subSectionActions';
import * as remoteActions from '../actions/remoteActions';
import apiConst from '../constants/apiConst';


export function getSubSections() {
	return axios.get(`${apiConst.subSectionApi}`)
		.then(response => {
			debugger;
		    return response.data;
		});
}

export function getSubSectionById(id) {
	return axios.get(`${apiConst.subSectionApi}/${id}`)
		.then(response => {
			debugger;
			//store.dispatch(subSectionActions.setCurrentSubSection(response.data));
			
		    return response.data;
		});
}

export function deleteSubSection(item) {
	debugger;

	if (item.parentItemId) {
		item.sectionId = item.parentItemId;
		delete item.parentItemId;
	}

	const tasks = [];

	tasks.push(item.id);
	tasks.push(item.sectionId);
	tasks.push(axios.delete(`${apiConst.subSectionApi}/${item.id}`));

	return Promise.all(tasks)
		.spread((subSectionId, sectionId, response) => {
			debugger;
		    store.dispatch(subSectionActions.setCurrentInfoSubSection(null));

			store.dispatch(remoteActions.deleteSubSectionById(subSectionId, sectionId));
		});
}

export function modifySubSection(item) {
	debugger;

	if (item.parentItemId) {
		item.sectionId = item.parentItemId;
		delete item.parentItemId;
	}

	const tasks = [];

	tasks.push(item.id);
	tasks.push(item.sectionId);

	if (item.id) {
		tasks.push(updateSubSection(item));
	}
	else {
		tasks.push(createSubSection(item));
	}
	
	return Promise.all(tasks)
		.spread((subSectionId, sectionId, response) => {
			debugger;
			if (!subSectionId && response.data && response.data.id) {
				subSectionId = response.data.id;
			}

			store.dispatch(subSectionActions.setModifiableSubSection(null));

			store.dispatch(subSectionActions.setMovingSubSection(null));  //?

			store.dispatch(remoteActions.updateSubSectionById(subSectionId, sectionId));

			return true;
		})
}



function createSubSection(item) {
	return axios.post(`${apiConst.subSectionApi}`, {
		name: item.name,
		description: item.description,
		sectionId: item.sectionId,
		orderNumber: item.orderNumber,
	})
}

function updateSubSection(item) {
	return axios.put(`${apiConst.subSectionApi}/${item.id}`, {
		name: item.name,
		description: item.description,
		sectionId: item.sectionId,
		orderNumber: item.orderNumber,
	})
}
