'use strict';

export function isEmailValid(email) {   //?
	var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return emailRegex.test(String(email).toLowerCase());
}

export function isTokensDataValid(tokensData) {
	if (tokensData.accessToken &&
		tokensData.refreshToken &&
		tokensData.accessTokenExpiresIn) {
			return true;
	}
	else {
		return false;
	}
}

export function saveTokensData(tokensData) {
	debugger;

	localStorage.setItem('refreshToken', tokensData.refreshToken);
	localStorage.setItem('accessToken', tokensData.accessToken);
	localStorage.setItem('accessTokenExpiresIn', tokensData.accessTokenExpiresIn);
}

export function removeTokensData() {
	localStorage.removeItem("refreshToken");
	localStorage.removeItem("accessToken");
	localStorage.removeItem("accessTokenExpiresIn");
}

export function getAccessToken() {
	return localStorage.getItem('accessToken');
}

export function getRefreshToken() {
	return localStorage.getItem('refreshToken');
}

export function isAccessTokenExpired() {
	const accessTokenExpiresIn = localStorage.getItem('accessTokenExpiresIn');
	const nowTime = new Date().getTime();

	return accessTokenExpiresIn <= nowTime;
};


