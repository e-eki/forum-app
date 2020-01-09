'use strict';

import axios from 'axios';
import Promise from 'bluebird';
import store from '../store/store';
import * as subSectionActions from '../actions/subSectionActions';
import * as remoteActions from '../actions/remoteActions';
import apiConst from '../constants/apiConst';
import { getActualAccessToken } from '../api/authApi';

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
		    return response.data;
		});
}

export function deleteSubSection(item) {
	debugger;
	return Promise.resolve(true)
		.then(() => {
			return getActualAccessToken();
		})
		.then(accessToken => {
			if (item.parentItemId) {
				item.sectionId = item.parentItemId;
				delete item.parentItemId;
			}

			const tasks = [];

			tasks.push(item.id);
			tasks.push(item.sectionId);

			const options = {
				method: 'DELETE',
				headers: { 'Authorization': `Token ${accessToken}` },
				url: `${apiConst.subSectionApi}/${item.id}`
			};
			
			tasks.push(axios(options));

			return Promise.all(tasks);
		})
		.spread((subSectionId, sectionId, response) => {
			debugger;
		    //store.dispatch(subSectionActions.setCurrentInfoSubSection(null));

			store.dispatch(remoteActions.deleteSubSectionById(subSectionId, sectionId));

			return true;
		});
}

export function modifySubSection(item) {
	debugger;
	return Promise.resolve(true)
		.then(() => {
			return getActualAccessToken();
		})
		.then(accessToken => {
			if (item.parentItemId) {
				item.sectionId = item.parentItemId;
				delete item.parentItemId;
			}

			const tasks = [];

			tasks.push(item.id);
			tasks.push(item.sectionId);

			const subSectionData = {
				name: item.name,
				description: item.description,
				sectionId: item.sectionId,
				orderNumber: item.orderNumber,
			};

			if (item.id) {
				tasks.push(_updateSubSection(subSectionData, accessToken));
			}
			else {
				tasks.push(_createSubSection(subSectionData, accessToken));
			}
			
			return Promise.all(tasks);
		})
		.spread((subSectionId, sectionId, response) => {
			debugger;
			if (!subSectionId && response.data && response.data.id) {
				subSectionId = response.data.id;
			}

			//store.dispatch(subSectionActions.setModifiableSubSection(null));

			store.dispatch(remoteActions.updateSubSectionById(subSectionId, sectionId));

			return true;
		})
}



function _createSubSection((subSectionData, accessToken) {
	const options = {
		method: 'POST',
		headers: { 'Authorization': `Token ${accessToken}` },
		url: `${apiConst.subSectionApi}`,
		data: subSectionData,
	};
	
	return axios(options);
}

function _updateSubSection((subSectionData, accessToken) {
	const options = {
		method: 'PUT',
		headers: { 'Authorization': `Token ${accessToken}` },
		url: `${apiConst.subSectionApi}/${item.id}`,
		data: subSectionData,
	};
	
	return axios(options);
}
