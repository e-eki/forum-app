import axios from 'axios';
import store from '../store/store';
import * as actions from '../actions/actions';
import apiConst from '../constants/apiConst';
import testData from '../../../test/storeData';


export function getSubSectionById(id) {
	// return axios.get(`${apiConst.subSectionApi/id}`)
	// 	.then(response => {
	// 	store.dispatch(actions.setCurrentSection(response.data));
	// 	return response;
	// 	});

	debugger;
	store.dispatch(actions.setCurrentSubSection(testData.currentSubSection));
}
