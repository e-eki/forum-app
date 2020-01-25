'use strict';

import axios from 'axios';
import Promise from 'bluebird';
import store from '../store/store';
import apiConst from '../constants/apiConst';
import { setCurrentUserInfo } from '../actions/userInfoActions';
import { getActualAccessToken } from '../api/authApi';

export function getUserInfoById(id) {
	debugger;
	return Promise.resolve(true)
		.then(() => {
			return getActualAccessToken();
		})
		.then(accessToken => {
			const options = {
				method: 'GET',
				headers: { 'Authorization': `Token ${accessToken}` },
				url: `${apiConst.userInfoApi}/${id}`,
			};
			
			return axios(options);
		})
}

export function getUserInfoAndSetCurrentUserInfo(id, isOwnInfo) {
	debugger;
	return Promise.resolve(true)
		.then(() => {
			if (isOwnInfo) {
				return getActualAccessToken();
			}
			else {
				return false;
			}
		})
		.then(accessToken => {
			if (accessToken) {
				const options = {
					method: 'GET',
					headers: { 'Authorization': `Token ${accessToken}` },
					url: `${apiConst.userInfoApi}`
				};
				
				return axios(options);
			}
			else {
				return axios.get(`${apiConst.userInfoApi}/${id}`);
			}
		})
		.then(response => {
			debugger;
			const userInfo = response.data;  //?
			userInfo.isOwnInfo = isOwnInfo;

			store.dispatch(setCurrentUserInfo(userInfo));

			return response.data;
		});
}

export function modifyUserInfo(item) {
	debugger;

	return Promise.resolve(true)
		.then(() => {
			return getActualAccessToken();
		})
		.then(accessToken => {
			const data = {
				name: item.name,
				birthDate: item.birthDate,
				city: item.city,
				profession: item.profession,
				hobby: item.hobby,
				captionText: item.captionText,
				role: item.role,
				inBlackList: item.inBlackList,
			};

			const options = {
				method: 'PUT',
				headers: { 'Authorization': `Token ${accessToken}` },
				url: `${apiConst.userInfoApi}/${item.id}`,
				data: data,
			};
			
			return axios(options);
		})
		.then(response => {
			return true;
		})
	}

