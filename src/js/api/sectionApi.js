import axios from 'axios';
import store from '../store/store';
import * as actions from '../actions/sectionActions';
import apiConst from '../constants/apiConst';
import testData from '../../../test/storeData';


export function getAllSections() {
	// return axios.get(`${apiConst.sectionApi}`)
	// 	.then(response => {
	// 	store.dispatch(actions.setSections(response.data));
	// 	return response;
	// 	});

	store.dispatch(actions.setSections(testData.sections));
}

export function getSectionById(id) {
	// return axios.get(`${apiConst.sectionApi/id}`)
	// 	.then(response => {
	// 	store.dispatch(actions.setCurrentSection(response.data));
	// 	return response;
	// 	});

	debugger;
	store.dispatch(actions.setCurrentSection(testData.currentSection));
}
