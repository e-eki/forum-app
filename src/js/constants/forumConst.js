'use strict';

module.exports = {
	// название форума
	forumName: 'Сферический форум в вакууме',

	// типы элементов форума
	itemTypes: {
		section: 'section',  // раздел
		subSection: 'subSection',   // подраздел
		channel: 'channel',   // чат
		message: 'message',   // сообщение
		privateChannel: 'privateChannel',   // личный чат
		searchChannel: 'searchChannel',   // чат в списке результатов поиска
		searchMessage: 'searchMessage',   // сообщение в списке результатов поиска
		userInfo: 'userInfo',   // информация юзера
	},

	// типы поиска по форуму
	searchTypes: {
		channels: 'по темам',
		messages: 'по сообщениям',
	},

	// кол-во символов последнего сообщения, отображаемое в превью под названием чата
	lastMessageTextLength: 10,

	// типы перемещения элементы в списке
	movingInListTypes: {
		up: 'вверх',
		down: 'вниз',
	},

	// роли юзера
	userRoles: {
		admin: 'admin',
		moderator: 'moderator',
		user: 'user',
	},

	// цветовые темы оформления
	colorThemes: {
		day: 'day',
		night: 'night',
	},

	// названия цветовых тем оформления
	colorThemeTitles: {
		day: 'дневной режим',
		night: 'ночной режим',
	}
}