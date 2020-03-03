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

// вход через соцсеть
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
		// headers: { 'Access-Control-Allow-Origin': 'http://localhost:8080' },
		headers: { 'Origin': 'https://forum-messenger.herokuapp.com' },   //?
		// headers: { 'Access-Control-Allow-Origin': '*' },
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
				_joinUserRoom(tokensData.userId);
				_setTokensData(response.data);
				return true;
			}
			else {
				throw new Error('auth error: invalid tokens data');
			}
		})
};

// вход через сайт
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
				_joinUserRoom(tokensData.userId);
				_setTokensData(response.data);
				return true;
			}
			else {
				throw new Error('auth error: invalid tokens data');
			}
		})
};

// выход с сайта
export function logout() {
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

// регистрация на сайте
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

// запрос на письмо с инструкциями по смене пароля
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

// запрос на повторное письмо для подтверждения имейла
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

// сброс пароля
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
			_leaveUserRoom();
			_resetTokensData();

			return true;
		})
};

// получение аксесс токена с неистекшим сроком жизни или выброс ошибки
// (если текущий аксесс токен не протух, то берем его. Если протух, то отправляем на сервер запрос на рефреш токенов.)
export function getActualAccessToken() {
	debugger;
	//const accessToken = authUtils.getAccessToken();
	const refreshToken = authUtils.getRefreshToken();
	//const accessTokenExpired = authUtils.isAccessTokenExpired();

	const accessToken = store.getState().authState.get('accessToken');
	const accessTokenExpired = store.getState().authState.get('accessTokenExpired');

	return Promise.resolve(true)
		.then(() => {
			if (accessToken && !accessTokenExpired) {
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
			const userId = response.data ? response.data.userId : null;
			_joinUserRoom(userId);  //?

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

// сохранить роль юзера
export function setUserRole(role) {
	debugger;
	store.dispatch(authActions.setUserRole(role));
	authUtils.saveUserRole(role);
}

// присоединиться к комнате с id юзера (для того, чтобы подписаться на получение оповещений с сервера, связанных с
// новыми личными сообщениями и изменением данных юзера)
// тк при перезагрузке страницы юзер выходит из комнаты, то нужно периодически проверять и заново его присоединять.
// делается при каждом получении аксесс токена, тк это происходит очень часто. Возможно, нужно лучшее решение (?).
function _joinUserRoom(userId) {
	debugger;

	const userIdFromStore = store.getState().authState.get('userId');
	const userIdFromLocalStorage = authUtils.getUserId();

	const actualUserId = userId || userIdFromLocalStorage;

	if (actualUserId &&
		(!userIdFromStore || userIdFromStore !== actualUserId)) {
			store.dispatch(joinRoom(actualUserId));
			store.dispatch(authActions.setUserId(actualUserId));
	}
}

// выйти из комнаты с id юзера
function _leaveUserRoom() {
	debugger;
	const userId = authUtils.getUserId();

	if (userId) {
		store.dispatch(leaveRoom(userId));
	}
}

// сохранить токены и сопутствующую информацию
function _setTokensData(tokensData) {
	debugger;

	store.dispatch(authActions.setAccessToken(tokensData.accessToken));
	//store.dispatch(authActions.setRefreshToken(tokensData.refreshToken));
	store.dispatch(authActions.setAccessTokenExpiresIn(tokensData.accessTokenExpiresIn));
	store.dispatch(authActions.setUserId(tokensData.userId));
	store.dispatch(authActions.setUserRole(tokensData.userRole));

	authUtils.saveTokensData(tokensData);
}

// удалить токены и сопутствующую информацию
function _resetTokensData() {
	debugger;

	store.dispatch(authActions.setAccessToken(null));
	//store.dispatch(authActions.setRefreshToken(null));
	store.dispatch(authActions.setAccessTokenExpiresIn(null));
	store.dispatch(authActions.setUserId(null));

	authUtils.removeTokensData();
}
