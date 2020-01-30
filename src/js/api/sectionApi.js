'use strict';

import axios from 'axios';
import Promise from 'bluebird';
import store from '../store/store';
import * as remoteActions from '../actions/remoteActions';
import apiConst from '../constants/apiConst';
import { getActualAccessToken } from '../api/authApi';

export function getSections() {
	return Promise.resolve(true)
		.then(() => {
		// 	return getActualAccessToken()
		// 		.catch(error => {
		// 			debugger;
		// 			return false;
		// 		})
		// })
		// .then(accessToken => {
			const options = {
				method: 'GET',
				url: `${apiConst.sectionApi}`
			};

			// if (accessToken) {
			// 	options.headers = { 'Authorization': `Token ${accessToken}` };
			// }
			
			return axios(options);
		})
		.then(response => {
			debugger;
            return response.data;
		});
}

export function getSectionById(id) {
	return Promise.resolve(true)
		.then(() => {
			return getActualAccessToken()
				.catch(error => {
					debugger;
					return false;
				})
		})
		.then(accessToken => {
			const options = {
				method: 'GET',
				url: `${apiConst.sectionApi}/${id}`
			};

			if (accessToken) {
				options.headers = { 'Authorization': `Token ${accessToken}` };
			}
			
			return axios(options);
		})
		.then(response => {
			debugger;
            return response.data;
		});
}

export function deleteSection(item) {
	return Promise.resolve(true)
		.then(() => {
			return getActualAccessToken();
		})
		.then(accessToken => {
			const tasks = [];

			tasks.push(item.id);

			const options = {
				method: 'DELETE',
				headers: { 'Authorization': `Token ${accessToken}` },
				url: `${apiConst.sectionApi}/${item.id}`
			};
			
			tasks.push(axios(options));

			return Promise.all(tasks);
		})
		.spread((sectionId, response) => {
			debugger;
			store.dispatch(remoteActions.deleteSectionById(sectionId));

			return true;
		});
}

export function modifySection(item) {
	debugger;
	return Promise.resolve(true)
		.then(() => {
			return getActualAccessToken();
		})
		.then(accessToken => {
			const tasks = [];

			tasks.push(item.id);

			const sectionData = {
				name: item.name,
				description: item.description,
				orderNumber: item.orderNumber,
			};

			if (item.id) {
				tasks.push(_updateSection(sectionData, accessToken));
			}
			else {
				tasks.push(_createSection(sectionData, accessToken));
			}
			
			return Promise.all(tasks);
		})
		.spread((sectionId, response) => {
			debugger;
			if (!sectionId && response.data && response.data.id) {
				sectionId = response.data.id;
			}

			store.dispatch(remoteActions.updateSectionById(sectionId));

			return true;
		})
}



function _createSection(sectionData, accessToken) {
	const options = {
		method: 'POST',
		headers: { 'Authorization': `Token ${accessToken}` },
		url: `${apiConst.sectionApi}`,
		data: sectionData,
	};
	
	return axios(options);
}

function _updateSection(sectionData, accessToken) {
	const options = {
		method: 'PUT',
		headers: { 'Authorization': `Token ${accessToken}` },
		url: `${apiConst.sectionApi}/${item.id}`,
		data: sectionData,
	};
	
	return axios(options);
}
