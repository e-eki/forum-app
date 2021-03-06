'use strict';

import * as copyUtils from '../utils/copyUtils';
import { setAlertData } from '../actions/alertDataActions';
import * as userInfoActions from '../actions/userInfoActions';
import { setUserRole } from '../api/authApi';
import { getUserId, getUserRole } from '../utils/authUtils';
import appConst from '../constants/appConst';

// получение по сокетам действий, связанных с данными юзера

// обновление данных юзера (роль, чс)
export function updateUser(store, action) {
	debugger;

	// todo: сделать обновление данных юзера
	// todo: сделать обновление страницы при изменении внесения юзера в ЧС и роли юезра
	// todo: оповещение 'Редактируемые данные пользователя были изменены.' появляется не всегда

	if (action.userId && action.data) {
		const currentUserInfo = store.getState().userInfoState.get('currentUserInfo');
		const modifiableUserInfo = store.getState().userInfoState.get('modifiableUserInfo');
		const userId = getUserId();
		const userRole = getUserRole();

		// если это информация юзера, и юзер ее просматривает
		if (currentUserInfo && (action.userId === currentUserInfo.userId)) {
			const newUserInfo = copyUtils.copyUserInfo(currentUserInfo);
			newUserInfo.role = action.data.role;
			newUserInfo.inBlackList = action.data.inBlackList;

			store.dispatch(userInfoActions.setCurrentUserInfo(newUserInfo));

			if (action.senderId !== userId) {
				store.dispatch(setAlertData({
					message: 'Редактируемые данные пользователя были изменены.',
				}));
			}
		}

		// если это информация юзера, и юзер ее редактирует 
		if (modifiableUserInfo && (action.userId === modifiableUserInfo.userId)) {
			store.dispatch(userInfoActions.setModifiableUserInfo(null));

			if (action.senderId !== userId) {
				store.dispatch(setAlertData({
					message: 'Редактируемые данные пользователя были изменены.',
				}));
			}
		}

		// если это информация юзера
		if (userId === action.userId) {
			if (userRole !== action.data.role) {
				setUserRole(action.data.role);
			}

			// todo: сделать корректное оповещение при удалении из ЧС
			if (action.data.inBlackList) {
				const alertData = {
					message: 'Вы были добавлены в чёрный список пользователей форума. Ваши возможности на форуме будут ограничены.',
				};
			
				store.dispatch(setAlertData(alertData));
			}
		}
	}
};
