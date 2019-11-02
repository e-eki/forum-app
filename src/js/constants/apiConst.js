'use strict';

const server_url = 'http://localhost:3000';
const api_url = `${server_url}/api`;

module.exports = {
	serverUrl: `${server_url}`,

	sectionApi: `${api_url}/section`,
	subSectionApi: `${api_url}/subsection`,
	channelApi: `${api_url}/channel`,
	userChannelApi: `${api_url}/user-channel`,
	userInfoApi: `${api_url}/userinfo`,

	// emailConfirmApi: `${api_url}/emailconfirm/`,
	// getLkDataApi: `${api_url}/lkUserData/`,
	// login: `${api_url}/login/`,
	// registration: `${api_url}/registration/`,
	// refreshTokens: `${api_url}/refreshtokens/`,
	// logout: `${api_url}/logout/`,
	// gameApi: `${api_url}/game/`,
	// gameTurnApi: `${api_url}/gameturn/`,
}