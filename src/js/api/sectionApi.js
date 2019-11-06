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
		    store.dispatch(actions.setSections(response.data));
            return response;
		});
}

export function getSectionById(id) {
	return axios.get(`${apiConst.sectionApi}/${id}`)
		.then(response => {
			debugger;
			store.dispatch(actions.setCurrentSection(response.data));
			
			store.dispatch(remoteActions.joinRoom(response.data.id));  //todo: сделать выход при уходе со страницы

		    return response;
		});
}

export function deleteSection(id) {
	return axios.delete(`${apiConst.sectionApi}/${id}`)  //??
		.then(response => {
			debugger;
		    store.dispatch(actions.setCurrentInfoSection(null));

			store.dispatch(remoteActions.updateSections());
		});
}

export function modifySection(item) {
	debugger;

	const tasks = [];

	if (item.id) {
		tasks.push(updateSection(item));
	}
	else {
		tasks.push(createSection(item));
	}
	
	return Promise.all(tasks)
		.spread((response) => {
			debugger;
			store.dispatch(actions.setModifiableSection(null));

			store.dispatch(remoteActions.joinRoom('1'));  //todo

			store.dispatch(remoteActions.updateSections());

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
