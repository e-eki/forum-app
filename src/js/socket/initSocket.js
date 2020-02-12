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

socket.on('action', action => {
	debugger;
	
	if (action && action.type) {
		switch (action.type) {

			case actionTypes.UPDATE_SECTION_BY_ID:
				sectionSocketActions.updateSection(store,action);
				break;

			case actionTypes.DELETE_SECTION_BY_ID:
				sectionSocketActions.deleteSection(store, action);
				break;

			case actionTypes.UPDATE_SUBSECTION_BY_ID:
				subSectionSocketActions.updateSubSection(store, action);
				break;

			case actionTypes.DELETE_SUBSECTION_BY_ID:
				subSectionSocketActions.deleteSubSection(store, action);
				break;

			case actionTypes.UPDATE_CHANNEL_BY_ID:
				channelSocketActions.updateChannel(store, action);
				break;

			case actionTypes.DELETE_CHANNEL_BY_ID:
				channelSocketActions.deleteChannel(store, action);
				break;

			case actionTypes.UPDATE_MESSAGE_BY_ID:
				messageSocketActions.updateMessage(store, action);
				break;

			case actionTypes.DELETE_MESSAGE_BY_ID:
				messageSocketActions.deleteMessage(store, action);
				break;

			//todo: ?сделать, чтоб не рендерился дважды чат в списке ЛС, когда одно событие приходит как currentChannel и как recipientId
			case actionTypes.UPDATE_PRIVATE_CHANNEL_BY_ID:
				privateChannelSocketActions.updatePrivateChannel(store, action);
				break;

			case actionTypes.DELETE_PRIVATE_CHANNEL_BY_ID:
				privateChannelSocketActions.deletePrivateChannel(store, action);
				break;

			case actionTypes.UPDATE_USER:
				userSocketActions.updateUser(store, action);				
				break;

			default:
				debugger;
				break;
		}
	}
});

export default socket;
