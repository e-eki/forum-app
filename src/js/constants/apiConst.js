'use strict';

const server_url = 'http://localhost:3000';
// const server_url = 'https://forum-messenger.herokuapp.com';   // для heroku
const api_url = `${server_url}/api`;

// id клиента для авторизации через вконтакте
const vk_client_id = '6711833';
// id клиента для авторизации через гугл
const google_client_id = '100666725887-otk617ad9448ec49096hufs8001hhel3.apps.googleusercontent.com';

// адреса для обращения к апи сервера и соцсетей
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

	loginApi: `${api_url}/login/`,
	registrationApi: `${api_url}/registration/`,
	refreshTokensApi: `${api_url}/refresh-tokens/`,
	emailConfirmApi: `${api_url}/email-confirm/`,
	resetPasswordApi: `${api_url}/reset-password/`,
	logoutApi: `${api_url}/logout/`,

	// id комнаты по умолчанию для присоединения черз сокеты на сервере (при просмотре главной страницы)
	defaultRoomId: '0',
}