'use strict';

export function isEmailValid(email) {   //?
	var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return emailRegex.test(String(email).toLowerCase());
}

export function isTokensDataValid(tokensData) {
	if (tokensData.accessToken &&
		tokensData.refreshToken &&
		tokensData.accessTokenExpiresIn &&
		tokensData.userId &&
		tokensData.userRole) {
			return true;
	}
	else {
		return false;
	}
}

export function saveTokensData(tokensData) {
	localStorage.setItem('refreshToken', tokensData.refreshToken);
	//localStorage.setItem('accessToken', tokensData.accessToken);
	//localStorage.setItem('accessTokenExpiresIn', tokensData.accessTokenExpiresIn);

	localStorage.setItem('userId', tokensData.userId);
	localStorage.setItem('userRole', tokensData.userRole);
}

export function saveUserRole(role) {
	localStorage.setItem('userRole', role);
}

export function removeTokensData() {
	localStorage.removeItem("refreshToken");
	//localStorage.removeItem("accessToken");
	//localStorage.removeItem("accessTokenExpiresIn");

	localStorage.removeItem("userId");
	localStorage.removeItem("userRole");
}

// export function getAccessToken() {
// 	return localStorage.getItem('accessToken');
// }

export function getRefreshToken() {
	return localStorage.getItem('refreshToken');
}

export function isAccessTokenExpired(accessTokenExpiresIn) {
	debugger;
	//const accessTokenExpiresIn = localStorage.getItem('accessTokenExpiresIn');
	const nowTime = new Date().getTime();

	return accessTokenExpiresIn <= nowTime;
};

export function getUserId() {
	return localStorage.getItem('userId');
}

export function getUserRole() {
	return localStorage.getItem('userRole');
}


