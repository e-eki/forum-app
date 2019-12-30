'use strict';

const server_url = 'http://localhost:3000';
const api_url = `${server_url}/api`;

const vk_client_id = '6711833';
const google_client_id = '100666725887-otk617ad9448ec49096hufs8001hhel3.apps.googleusercontent.com';

module.exports = {
	serverUrl: `${server_url}`,

	vkApi: `https://oauth.vk.com/authorize?client_id=${vk_client_id}&display=page&scope=email&redirect_uri=${api_url}/login&response_type=code&v=5.85&state=vk`,
	googleApi: `https://accounts.google.com/o/oauth2/auth?redirect_uri=${api_url}/login&response_type=code&client_id=${google_client_id}&scope=https://www.googleapis.com/auth/userinfo.email`,

	sectionApi: `${api_url}/section`,
	subSectionApi: `${api_url}/subsection`,
	channelApi: `${api_url}/channel`,
	messageApi: `${api_url}/message`,

	privateChannelApi: `${api_url}/private-channel`,
	userInfoApi: `${api_url}/user-info`,

	defaultRoomId: '0',

	loginApi: `${api_url}/login/`,
	registrationApi: `${api_url}/registration/`,
	refreshTokensApi: `${api_url}/refresh-tokens/`,
	emailConfirmApi: `${api_url}/email-confirm/`,
	resetPasswordApi: `${api_url}/reset-password/`,
	logoutApi: `${api_url}/logout/`,
}