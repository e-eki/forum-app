'use strict';

import * as copyUtils from '../utils/copyUtils';
import { setAlertData } from '../actions/alertDataActions';
import * as userInfoActions from '../actions/userInfoActions';

// получение по сокетам действий, связанных с данными юзера

// обновление данных юзера (роль, чс)  //todo!
export function updateUserInfo(store, action) {
	debugger;

	if (action.userId && action.data) {
		const currentUserInfo = store.getState().userInfoState.get('currentUserInfo');
		const modifiableUserInfo = store.getState().userInfoState.get('modifiableUserInfo');

		if (currentUserInfo && (action.userId === currentUserInfo.userId)) {  //?
			const newUserInfo = copyUtils.copyUserInfo(currentUserInfo);
			newUserInfo.role = action.data.role;
			newUserInfo.inBlackList = action.data.inBlackList;

			store.dispatch(userInfoActions.setCurrentUserInfo(newUserInfo));

			store.dispatch(setAlertData({
				message: 'Редактируемые данные пользователя были изменены.',
			}));
		}

		if (modifiableUserInfo && (action.userId === modifiableUserInfo.userId)) {  //?
			store.dispatch(userInfoActions.setModifiableUserInfo(null));

			store.dispatch(setAlertData({
				message: 'Редактируемые данные пользователя были изменены.',
			}));
		}
	}
};
