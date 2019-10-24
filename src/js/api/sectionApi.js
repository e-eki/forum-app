import axios from 'axios';
import store from '../store';
import * as actions from '../actions/actions';
import apiConst from '../constants/apiConst';
import testData from '../../../test/storeData';


export function getSectionById(id) {
	// return axios.get(`${apiConst.sectionApi/id}`)
	// 	.then(response => {
	// 	store.dispatch(actions.setCurrentSection(response.data));
	// 	return response;
	// 	});

	debugger;
	store.dispatch(actions.setCurrentSection(testData.currentSection));
}

export function getAllSections() {
	// return axios.get(`${apiConst.sectionApi}`)
	// 	.then(response => {
	// 	store.dispatch(actions.setSections(response.data));
	// 	return response;
	// 	});

	debugger;
	store.dispatch(actions.setSections(testData.sections));
}