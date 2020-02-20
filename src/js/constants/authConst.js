'use strict';

// для аутентификации
module.exports = {
	// значения полей по умолчанию
	defaultAuthData: {
		email: 'Введите e-mail',
		login: 'Введите логин',
		password: 'Введите пароль',
		duplicatePassword: 'Повторите пароль'
	},

	// значения полей для предупреждения о некорректных данных
	warningAuthData: {
		email: 'Введите корректный e-mail',
		login: 'Введите корректный логин',
		password: 'Введите корректный пароль',
		duplicatePassword: 'Пароли не совпадают'
	},

	// названия соцсетей для авторизации через них
	serviceNames: {
		vkontakte: 'vkontakte',
		google: 'google',
	},
}