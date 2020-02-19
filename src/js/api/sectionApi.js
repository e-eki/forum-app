'use strict';

import axios from 'axios';
import Promise from 'bluebird';
import store from '../store/store';
import * as remoteActions from '../actions/remoteActions';
import apiConst from '../constants/apiConst';
import { getActualAccessToken } from '../api/authApi';

// получить разделы
export function getSections() {
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
				url: `${apiConst.sectionApi}`
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

// получить раздел по id
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

// удалить раздел
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
			// отправляем на сервер событие об удалении раздела
			store.dispatch(remoteActions.deleteSectionById(sectionId));

			return true;
		});
}

// создание или редактирование раздела
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
				id: item.id,
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

			// отправляем на сервер событие об изменении раздела
			store.dispatch(remoteActions.updateSectionById(sectionId));

			return true;
		})
}


// создать раздел
function _createSection(sectionData, accessToken) {
	const options = {
		method: 'POST',
		headers: { 'Authorization': `Token ${accessToken}` },
		url: `${apiConst.sectionApi}`,
		data: sectionData,
	};
	
	return axios(options);
}

// редактировать раздел
function _updateSection(sectionData, accessToken) {
	const options = {
		method: 'PUT',
		headers: { 'Authorization': `Token ${accessToken}` },
		url: `${apiConst.sectionApi}/${sectionData.id}`,
		data: sectionData,
	};
	
	return axios(options);
}
