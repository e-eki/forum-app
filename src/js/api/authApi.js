'use strict';

import axios from 'axios';
import Promise from 'bluebird';
import store from '../store/store';
import * as authActions from '../actions/authActions';
import apiConst from '../constants/apiConst';
import authConst from '../constants/authConst';
import { getFingerprint } from '../utils/fingerprintUtils';
import * as authUtils from '../utils/authUtils';
import { joinRoom, leaveRoom } from '../actions/remoteActions';

export function socialLogin(serviceName) {
	debugger;
	let socialLink;

	switch (serviceName) {
		case authConst.serviceNames.vkontakte:
			socialLink = `${apiConst.vkApi}`;
			break;

		case authConst.serviceNames.google:
			socialLink = `${apiConst.googleApi}`;
			break;

		default:  //?
			throw new Error('social login error: no service name');
	}

	// TODO!!! vkontakte api не отвечает localhost (нет 'Access-Control-Allow-Origin' в заголовке)
	const options = {
		method: 'GET',
		headers: { 'Access-Control-Allow-Origin': 'http://localhost:8080' },
		url: socialLink
	};
	
	return Promise.resolve(axios(options))
		.then(socialLoginDataId => {
			debugger;
			const tasks = [];

			tasks.push(socialLoginDataId);

			//get fingerprint
			tasks.push(getFingerprint());

			return Promise.all(tasks);
		})
		.spread((socialLoginDataId, fingerprint) => {
			debugger;

			return axios.put(`${apiConst.loginApi}`, {
				socialLoginDataId: socialLoginDataId,
				fingerprint: fingerprint,
			})
		})
		.then(tokensData => {
			debugger;

			if (authUtils.isTokensDataValid(tokensData)) {
				_setTokensData(response.data);
				return true;
			}
			else {
				throw new Error('auth error: invalid tokens data');
			}
		})
};

export function login(email, password) {
	debugger;
	//get fingerprint
	return getFingerprint()
		.then(fingerprint => {

			return axios.post(`${apiConst.loginApi}`, {
				email: email,
				password: password,
				fingerprint: fingerprint,
			});
		})
		.then(response => {
			debugger;
			const tokensData = response.data;

			if (authUtils.isTokensDataValid(tokensData)) {
				_setTokensData(response.data);
				return true;
			}
			else {
				throw new Error('auth error: invalid tokens data');
			}
		})
};

export function logout() {   //todo!
	debugger;

	return Promise.resolve(true)
		.then(() => {
			return getActualAccessToken();
		})
		.then(accessToken => {
			const options = {
				method: 'DELETE',
				headers: { 'Authorization': `Token ${accessToken}` },
				url: `${apiConst.logoutApi}`
			};
			
			return axios(options);
		})
		.then(response => {
			_resetTokensData();

			return true;
		})
};

export function registration(email, login, password) {
	debugger;

	//get fingerprint
	return getFingerprint()
		.then(fingerprint => {
			return axios.post(`${apiConst.registrationApi}`, {
				email: email,
				login: login,
				password: password,
				fingerprint: fingerprint,
			});
		})
		.then(response => true)
};

export function recoveryPassword(email) {
	debugger;

	//get fingerprint
	return getFingerprint()
		.then(fingerprint => {
			return axios.post(`${apiConst.resetPasswordApi}`, {
				email: email,
				fingerprint: fingerprint,
			});
		})
		.then(response => true)
};

export function emailConfirm(email) {
	debugger;

	//get fingerprint
	return getFingerprint()
		.then(fingerprint => {
			return axios.post(`${apiConst.emailConfirmApi}`, {
				email: email,
				fingerprint: fingerprint,
			});
		})
		.then(response => true)
};

export function resetPassword(accessToken, password) {
	debugger;
	return Promise.resolve(true)
		.then(() => {
			const params = {
				password: password,
			};
		
			const options = {
				method: 'PUT',
				headers: { 'Authorization': `Token ${accessToken}` },
				data: params,
				url: `${apiConst.resetPasswordApi}`
			};
			
			return axios(options);
		})
		.then(response => {
			_resetTokensData();

			return true;
		})
};

export function getActualAccessToken() {
	debugger;
	const accessToken = authUtils.getAccessToken();
	const refreshToken = authUtils.getRefreshToken();
	const accessTokenExpired = authUtils.isAccessTokenExpired();

	return Promise.resolve(true)
		.then(() => {
			if (!accessTokenExpired) {
				return true;
			}
			else {
				// if (!refreshToken) {  //todo!!!
				// 	throw new Error('auth error: invalid tokens data');
				// }

				//get fingerprint
				return getFingerprint();
			}
		})
		.then(response => {
			if (response === true) {
				return true;
			}
			else {
				const fingerprint = response;

				return axios.post(`${apiConst.refreshTokensApi}`, {	
					refreshToken: refreshToken,
					fingerprint: fingerprint,
				});
			}
		})
		.then(response => {
			if (response === true) {
				return accessToken;
			}

			const tokensData = response.data;

			if (authUtils.isTokensDataValid(tokensData)) {
				_setTokensData(response.data);
				return tokensData.accessToken;
			}
			else {
				throw new Error('auth error: invalid tokens data');
			}
		})
};


function _setTokensData(tokensData) {
	debugger;
	const userId = store.getState().authState.get('userId');  //или из localStorage?

	if (!userId || (userId !== tokensData.userId)) {  //? todo!
		store.dispatch(joinRoom(tokensData.userId));
	}

	store.dispatch(authActions.setAccessToken(tokensData.accessToken));
	store.dispatch(authActions.setRefreshToken(tokensData.refreshToken));
	store.dispatch(authActions.setAccessTokenExpiresIn(tokensData.accessTokenExpiresIn));
	store.dispatch(authActions.setUserId(tokensData.userId));
	store.dispatch(authActions.setUserRole(tokensData.userRole));

	authUtils.saveTokensData(tokensData);
}

function _resetTokensData() {
	debugger;
	const userId = store.getState().authState.get('userId');   //или из localStorage?

	if (userId && (userId === tokensData.userId)) {  //?
		store.dispatch(leaveRoom(tokensData.userId));
	}

	store.dispatch(authActions.setAccessToken(null));
	store.dispatch(authActions.setRefreshToken(null));
	store.dispatch(authActions.setAccessTokenExpiresIn(null));
	store.dispatch(authActions.setUserId(null));

	authUtils.removeTokensData();
}
