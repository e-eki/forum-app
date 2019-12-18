'use strict';

import axios from 'axios';
import Promise from 'bluebird';
import store from '../store/store';
import * as sectionActions from '../actions/sectionActions';
import * as remoteActions from '../actions/remoteActions';
import apiConst from '../constants/apiConst';

export function getSections() {
	return axios.get(`${apiConst.sectionApi}`)
		.then(response => {
			debugger;
            return response.data;
		});
}

export function getSectionById(id) {
	return axios.get(`${apiConst.sectionApi}/${id}`)
		.then(response => {
			debugger;
		    return response.data;
		});
}

export function deleteSection(item) {
	const tasks = [];

	tasks.push(item.id);
	tasks.push(axios.delete(`${apiConst.sectionApi}/${item.id}`));

	return Promise.all(tasks)
		.spread((sectionId, response) => {
			debugger;
		    //store.dispatch(sectionActions.setCurrentInfoSection(null));

			store.dispatch(remoteActions.deleteSectionById(sectionId));

			return true;
		});
}

export function modifySection(item) {
	debugger;

	const tasks = [];

	tasks.push(item.id);

	if (item.id) {
		tasks.push(updateSection(item));
	}
	else {
		tasks.push(createSection(item));
	}
	
	return Promise.all(tasks)
		.spread((sectionId, response) => {
			debugger;
			if (!sectionId && response.data && response.data.id) {
				sectionId = response.data.id;
			}

			//store.dispatch(sectionActions.setModifiableSection(null));

			store.dispatch(remoteActions.updateSectionById(sectionId));

			return true;
		})
}



function createSection(item) {
	return axios.post(`${apiConst.sectionApi}`, {
		name: item.name,
		description: item.description,
		orderNumber: item.orderNumber,
	})
}

function updateSection(item) {
	return axios.put(`${apiConst.sectionApi}/${item.id}`, {
		name: item.name,
		description: item.description,
		orderNumber: item.orderNumber,
	})
}
