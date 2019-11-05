'use strict';

import axios from 'axios';
import Promise from 'bluebird';
import store from '../store/store';
import * as actions from '../actions/sectionActions';
import * as remoteActions from '../actions/remoteActions';
import apiConst from '../constants/apiConst';
import testData from '../../../test/storeData';


export function getAllSections() {
	return axios.get(`${apiConst.sectionApi}`)
		.then(response => {
			debugger;
		    store.dispatch(actions.setSections(response.data));
            return response;
		});
	//store.dispatch(actions.setSections(testData.sections));
}

export function getSectionById(id) {
	return axios.get(`${apiConst.sectionApi}/${id}`)
		.then(response => {
			debugger;
		    store.dispatch(actions.setCurrentSection(response.data[0]));  //??
		    return response;
		});

	//store.dispatch(actions.setCurrentSection(testData.currentSection));
}

export function modifySection(section) {
	debugger;

	const tasks = [];

	if (section.id) {
		tasks.push(updateSection(section));
	}
	else {
		tasks.push(createSection(section));
	}
	
	return Promise.all(tasks)
		.spread((response) => {
			debugger;
			store.dispatch(actions.setModifiableSection(null));

			store.dispatch(remoteActions.joinRoom('1'));

			store.dispatch(remoteActions.updateSections());

			//return getAllSections();
			return true;
		})
}



function createSection(section) {
	return axios.post(`${apiConst.sectionApi}`, {
		name: section.name,
		description: section.description,
	})
}

function updateSection(section) {
	return axios.put(`${apiConst.sectionApi}/${section.id}`, {
		name: section.name,
		description: section.description,
	})
}
