'use strict';

import axios from 'axios';
import Promise from 'bluebird';
import store from '../store/store';
import * as remoteActions from '../actions/remoteActions';
import apiConst from '../constants/apiConst';
import { getActualAccessToken } from '../api/authApi';

// получить список всех подразделов (для списка подразделов для перемещения чата)
export function getSubSections() {
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
				url: `${apiConst.subSectionApi}`
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

// получить подраздел по id
export function getSubSectionById(id) {
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
				url: `${apiConst.subSectionApi}/${id}`
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

// удалить подраздел
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

			// отправляем на сервер событие об удалении подраздела
			store.dispatch(remoteActions.deleteSubSectionById(subSectionId, sectionId));

			return true;
		});
}

// создание или редактирование подраздела
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
				id: item.id,
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

			// отправляем на сервер событие об изменении подраздела
			store.dispatch(remoteActions.updateSubSectionById(subSectionId, sectionId));

			return true;
		})
}


// создать подраздел
function _createSubSection(subSectionData, accessToken) {
	const options = {
		method: 'POST',
		headers: { 'Authorization': `Token ${accessToken}` },
		url: `${apiConst.subSectionApi}`,
		data: subSectionData,
	};
	
	return axios(options);
}

// редактировать подраздел
function _updateSubSection(subSectionData, accessToken) {
	const options = {
		method: 'PUT',
		headers: { 'Authorization': `Token ${accessToken}` },
		url: `${apiConst.subSectionApi}/${subSectionData.id}`,
		data: subSectionData,
	};
	
	return axios(options);
}
