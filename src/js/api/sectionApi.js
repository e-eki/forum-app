'use strict';

import axios from 'axios';
import Promise from 'bluebird';
import store from '../store/store';
import * as actions from '../actions/sectionActions';
import * as remoteActions from '../actions/remoteActions';
import apiConst from '../constants/apiConst';


export function getAllSections() {
	return axios.get(`${apiConst.sectionApi}`)
		.then(response => {
			debugger;
		    store.dispatch(actions.setSections(response.data));  //todo: где лучше - здесь или в contentContainer?
            return response.data;
		});
}

export function getSectionById(id) {
	return axios.get(`${apiConst.sectionApi}/${id}`)
		.then(response => {
			debugger;
			store.dispatch(actions.setCurrentSection(response.data));
			
			//store.dispatch(remoteActions.joinRoom(response.data.id));

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
		    store.dispatch(actions.setCurrentInfoSection(null));

			store.dispatch(remoteActions.deleteSectionById(sectionId));
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
			store.dispatch(actions.setModifiableSection(null));

			//store.dispatch(remoteActions.joinRoom('1'));  //todo

			store.dispatch(remoteActions.updateSectionById(sectionId));

			return true;
		})
}



function createSection(item) {
	return axios.post(`${apiConst.sectionApi}`, {
		name: item.name,
		description: item.description,
	})
}

function updateSection(item) {
	return axios.put(`${apiConst.sectionApi}/${item.id}`, {
		name: item.name,
		description: item.description,
	})
}
