'use strict';

import { getUserId, getUserRole} from './authUtils';
import forumConst from '../constants/forumConst';

// кроме как здесь, везде все права проверяются и передаются с бэкенда
// но при добавлении/редактировании элементов (раздел/подраздел/чат/сообщение), сразу же неизвестны права на редактирование/удаление,
// известны после перезагрузки страницы. Это сделано, чтобы права были сразу. Но права не должны дублироваться на фронтенде.
// todo: придумать красивое решение проблемы, и убрать с фронтенда определение прав.
export function getEditDeleteRightsForItem(item) {  
	debugger;
	let canEdit = false;
	let canDelete = false;
	let canAdd = false;

	// const userId = store.getState().authState.get('userId');
	// const userRole = store.getState().authState.get('userRole');

	const userId = getUserId();
	const userRole = getUserRole();  // роль юзера в хранилище & localStorage нужна только для этого метода (потом убрать!)

	switch (item.type) {
		case forumConst.itemTypes.section:
			if (userRole === forumConst.userRoles.admin) {
				canEdit = true;
				canDelete = true;
				canAdd = true;
			}
			break;

		case forumConst.itemTypes.subSection:
			if (userRole === forumConst.userRoles.admin) {
				canEdit = true;
				canDelete = true;
				canAdd = true;
			}
			else if (userRole === forumConst.itemTypes.moderator) {
				canAdd = true;
			}
			break;

		case forumConst.itemTypes.channel:
			if (userRole === forumConst.userRoles.admin ||
				userRole === forumConst.userRoles.moderator) {
					canEdit = true;
					canDelete = true;
					canAdd = true;
			}
			else if (userRole === forumConst.userRoles.user) {
				canAdd = true;

				if (item.senderId === userId) {
					canEdit = true;
				}
			}
			break;

		case forumConst.itemTypes.privateChannel:
			if (item.senderId === userId || item.recipientId === userId) {
				canEdit = true;
				canDelete = true;
				canAdd = true;
			}
			break;

		case forumConst.itemTypes.message:
			if (userRole === forumConst.userRoles.admin ||
				userRole === forumConst.userRoles.moderator) {
					canEdit = true;
					canDelete = true;
			}
			else if (userRole === forumConst.userRoles.user && (item.senderId === userId)) {
				canEdit = true;
				canDelete = true;
			}
			break;
	}

	item.canEdit = canEdit;
	item.canDelete = canDelete;
	item.canAdd = canAdd;

	return item;
};
