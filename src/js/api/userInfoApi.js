'use strict';

import axios from 'axios';
import Promise from 'bluebird';
import store from '../store/store';
import apiConst from '../constants/apiConst';
import { setCurrentUserInfo } from '../actions/userInfoActions';
import { getActualAccessToken } from '../api/authApi';
import { showErrorMessage } from '../utils/baseUtils';
import { updateUser } from '../actions/remoteActions';

export function getUserInfoById(id) {
	debugger;
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
				url: `${apiConst.userInfoApi}/${id}`,
			};

			if (accessToken) {
				options.headers = { 'Authorization': `Token ${accessToken}` };
			}
			
			return axios(options);
		})
		.then(response => {
			debugger;
            return response.data;
		})
		.catch(error => {
			showErrorMessage(error);
			return false;
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
				return getActualAccessToken()
					.catch(error => {
						debugger;
						return false;
					})
			}
		})
		.then(accessToken => {
			const options = {
				method: 'GET',
			};

			if (accessToken) {
				options.headers = { 'Authorization': `Token ${accessToken}` };
			}

			if (id) {
				options.url = `${apiConst.userInfoApi}/${id}`;
			}
			else {
				options.url = `${apiConst.userInfoApi}`;
			}
			
			return axios(options);
		})
		.then(response => {
			debugger;
			const userInfo = response.data;  //?
			userInfo.isOwnInfo = isOwnInfo;

			store.dispatch(setCurrentUserInfo(userInfo));

			return response.data;
		})
		.catch(error => {
			showErrorMessage(error);
			return false;
		})
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
			debugger;
			if (item.role) {
				store.dispatch(updateUser(item.userId));   //?
			}

			return true;
		})
		.catch(error => {
			showErrorMessage(error);
			return false;
		})
	}

