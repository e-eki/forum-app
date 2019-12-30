'use strict';

import axios from 'axios';
import Promise from 'bluebird';
import store from '../store/store';
import * as authActions from '../actions/authActions';
import apiConst from '../constants/apiConst';
import authConst from '../constants/authConst';


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
			throw new Error('login error: no service name');
	}

	// TODO!!! vkontakte api не отвечает localhost (нет 'Access-Control-Allow-Origin' в заголовке)
	const options = {
		method: 'GET',
		headers: { 'Access-Control-Allow-Origin': 'http://localhost:8080' },
		url: socialLink
	};
	
	return axios(options)
	//return axios.get(socialLink)
		.then(tokensData => {
			debugger;

			if (_isTokensDataValid(tokensData)) {
				_setTokensData(response.data);
				return true;
			}
			else {
				return false;  //?
			}
		})
};

export function loginAction(email, password) {
	debugger;
	return axios.post(`${apiConst.loginApi}`, {
		email: email,
		password: password,
	})
		.then(tokensData => {
			debugger;

			if (_isTokensDataValid(tokensData)) {
				_setTokensData(response.data);
				return true;
			}
			else {
				return false;  //?
			}
		})
};


function _isTokensDataValid(tokensData) {
	if (tokensData.accessToken &&
		tokensData.refreshToken &&
		tokensData.accessTokenExpiresIn) {
			return true;
	}
	else {
		return false;
	}
}

function _setTokensData(tokensData) {
	debugger;

	store.dispatch(authActions.setAccessToken(tokensData.accessToken));
	store.dispatch(authActions.setRefreshToken(tokensData.refreshToken));
	store.dispatch(authActions.setAccessTokenExpiresIn(tokensData.accessTokenExpiresIn));
}
