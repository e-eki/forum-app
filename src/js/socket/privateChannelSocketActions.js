'use strict';

import * as copyUtils from '../utils/copyUtils';
import { setCurrentPrivateChannel, setPrivateChannels } from '../actions/privateChannelActions';
import { setAlertData } from '../actions/alertDataActions';
import appConst from '../constants/appConst';
import { getEditDeleteRightsForItem } from '../utils/rightsUtils';
import forumConst from '../constants/forumConst';
import {setNewPrivateMessagesCount} from '../actions/notificationActions';

// получение по сокетам действий, связанных с личными чатами

// обновление личного чата
export function updatePrivateChannel(store, action) {
	debugger;

	if (action.privateChannelId && action.data) {
		const privateChannels = store.getState().privateChannelState.get('privateChannels');
		const currentPrivateChannel = store.getState().privateChannelState.get('currentPrivateChannel');

		debugger;
		action.data.type = forumConst.itemTypes.privateChannel;
		const updatedPrivateChannel = getEditDeleteRightsForItem(action.data);

		if (!updatedPrivateChannel.messages) {
			updatedPrivateChannel.messages = [];
		}

		// если юзер на странице со своими личными чатами
		if (privateChannels) {
			const privateChannel = privateChannels.find(item => item.id === action.privateChannelId);

			if (privateChannel) {
				const newPrivateChannel= copyUtils.copyPrivateChannel(updatedPrivateChannel);

				const index = privateChannels.indexOf(privateChannel);
				privateChannels[index] = newPrivateChannel;
			}
			else {
				privateChannels.push(updatedPrivateChannel);
			}

			const newPrivateChannels = privateChannels.slice();
			store.dispatch(setPrivateChannels(newPrivateChannels));
		}
		// если юзер на странице с этим личным чатом
		// todo: при обновлении чата (закреплении/откреплении сообщения) - название чата пропадает.
		else if (currentPrivateChannel &&
			(currentPrivateChannel.id === action.privateChannelId)) {
				const newCurrentPrivateChannel = copyUtils.copyPrivateChannel(updatedPrivateChannel);
				newCurrentPrivateChannel.messages = currentPrivateChannel.messages;

				store.dispatch(setCurrentPrivateChannel(newCurrentPrivateChannel));
		}
	}
};


// удаление личного чата
export function deletePrivateChannel(store, action) {
	debugger;
	if (action.privateChannelId) {
		const privateChannels = store.getState().privateChannelState.get('privateChannels');
		const currentPrivateChannel = store.getState().privateChannelState.get('currentPrivateChannel');

		// сбрасываем кол-во новых личных сообщений
		// todo: сделать, чтоб уменьшалось на кол-во новых сообщений в удаленном чате
		store.dispatch(setNewPrivateMessagesCount(0));

		// если юзер на странице со своими личными чатами
		if (privateChannels) {
			const newPrivateChannels = privateChannels.filter(item => item.id !== action.privateChannelId);
			store.dispatch(setPrivateChannels(newPrivateChannels));
		}
		// если юзер на странице с этим личным чатом
		else if (currentPrivateChannel &&
			(currentPrivateChannel.id === action.privateChannelId)) {
				store.dispatch(setCurrentPrivateChannel(null));     //?

				store.dispatch(setAlertData({
					message: 'Этот чат был удалён.',
					link: `${appConst.privateChannelsLink}`,
				}));
		}
	}
};


