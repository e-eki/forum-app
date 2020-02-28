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

	// названия элементов форума
	itemNames: {
		section: 'раздел',  // раздел
		subSection: 'подраздел',   // подраздел
		channel: 'чат',   // чат
		message: 'сообщение',   // сообщение
		privateChannel: 'личный чат',   // личный чат
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
		day: 'Дневной режим',
		night: 'Ночной режим',
	},

	// типы всплывающих окон
	popupTypes: {
		alert: 'alert',  // оповещения для юзера
		userInfo: 'userInfo',   // информация юзера
		info: 'info',   // информация элемента форума (раздел/подраздел/чат/сообщение)
		adding: 'adding',    // добавление элемента форума
		modifying: 'modifying',  // редактирование элемента форума
		moving: 'moving',   // перемещение элемента форума
	}
}