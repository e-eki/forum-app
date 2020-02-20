'use strict';

import io from 'socket.io-client';
import apiConst from '../constants/apiConst';
import appConst from '../constants/appConst';
import * as actionTypes from '../actions/actionTypes';
import store from '../store/store';
import * as sectionSocketActions from './sectionSocketActions';
import * as subSectionSocketActions from './subSectionSocketActions';
import * as channelSocketActions from './channelSocketActions';
import * as messageSocketActions from './messageSocketActions';
import * as privateChannelSocketActions from './privateChannelSocketActions';
import * as userSocketActions from './userSocketActions';

const socket = io(`${apiConst.serverUrl}`);

// инициализация подключения по сокетам
socket.on('action', action => {
	debugger;

	// Здесь клиент принимает с сервера сообщения о произошедших изменениях: операциях создания/редактирования/отмены
	// и отрендеривает соответствующие элементы.
	// (под обновлением подразумевается редактирование или создание)
	
	if (action && action.type) {
		switch (action.type) {

			// обновление раздела
			case actionTypes.UPDATE_SECTION_BY_ID:
				sectionSocketActions.updateSection(store,action);
				break;

			// удаление раздела
			case actionTypes.DELETE_SECTION_BY_ID:
				sectionSocketActions.deleteSection(store, action);
				break;

			// обновление подраздела
			case actionTypes.UPDATE_SUBSECTION_BY_ID:
				subSectionSocketActions.updateSubSection(store, action);
				break;

			// удаление подраздела
			case actionTypes.DELETE_SUBSECTION_BY_ID:
				subSectionSocketActions.deleteSubSection(store, action);
				break;

			// обновление чата
			case actionTypes.UPDATE_CHANNEL_BY_ID:
				channelSocketActions.updateChannel(store, action);
				break;

			// удаление чата
			case actionTypes.DELETE_CHANNEL_BY_ID:
				channelSocketActions.deleteChannel(store, action);
				break;

			// обновление сообщения
			case actionTypes.UPDATE_MESSAGE_BY_ID:
				messageSocketActions.updateMessage(store, action);
				break;

			// удаление сообщения
			case actionTypes.DELETE_MESSAGE_BY_ID:
				messageSocketActions.deleteMessage(store, action);
				break;

			//todo: ?сделать, чтоб не рендерился дважды чат в списке ЛС, когда одно событие приходит как currentChannel и как recipientId
			// обновление личного чата
			case actionTypes.UPDATE_PRIVATE_CHANNEL_BY_ID:
				privateChannelSocketActions.updatePrivateChannel(store, action);
				break;

			// удаление личного чата
			case actionTypes.DELETE_PRIVATE_CHANNEL_BY_ID:
				privateChannelSocketActions.deletePrivateChannel(store, action);
				break;

			// обновление информации юзера
			case actionTypes.UPDATE_USER:
				userSocketActions.updateUser(store, action);				
				break;

			default:
				break;
		}
	}
});

export default socket;
