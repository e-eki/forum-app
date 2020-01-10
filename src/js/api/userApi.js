'use strict';

import axios from 'axios';
import Promise from 'bluebird';
import apiConst from '../constants/apiConst';
import { getActualAccessToken } from '../api/authApi';

export function getUserData() {
	debugger;
	return Promise.resolve(true)
		.then(() => {
			return getActualAccessToken();
		})
		.then(accessToken => {
			const options = {
				method: 'GET',
				headers: { 'Authorization': `Token ${accessToken}` },
				url: `${apiConst.userDataApi}`,
			};
			
			return axios(options);
		})
		.then(response => {
			debugger;
			return response.data;
		})
		.catch(error => {
			debugger;
			return false;  //?
		})
}
