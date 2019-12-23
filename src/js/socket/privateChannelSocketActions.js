'use strict';

import * as copyUtils from '../utils/copyUtils';
import { setCurrentPrivateChannel, setPrivateChannels } from '../actions/privateChannelActions';
import { setAlertData } from '../actions/alertDataActions';
import appConst from '../constants/appConst';

// получение по сокетам действий, связанных с приватными чатами

// обновление приватного чата
export function updatePrivateChannel(store, action) {
	debugger;

	if (action.privateChannelId && action.data) {
		const privateChannels = store.getState().privateChannelState.get('privateChannels');
		const currentPrivateChannel = store.getState().privateChannelState.get('currentPrivateChannel');

		if (privateChannels) {
			const privateChannel = privateChannels.find(item => item.id === action.privateChannelId);

			if (privateChannel) {
				const newPrivateChannel= copyUtils.copyPrivateChannel(action.data);

				const index = privateChannels.indexOf(privateChannel);
				privateChannels[index] = newPrivateChannel;
			}
			else {
				privateChannels.push(action.data);
			}

			const newPrivateChannels = privateChannels.slice();
			store.dispatch(setPrivateChannels(newPrivateChannels));
		}
		else if (currentPrivateChannel &&
			(currentPrivateChannel.id === action.privateChannelId)) {
				const newCurrentPrivateChannel = copyUtils.copyPrivateChannel(action.data);
				newCurrentPrivateChannel.messages = currentPrivateChannel.messages;

				store.dispatch(setCurrentPrivateChannel(newCurrentPrivateChannel));
		}
	}
};


// удаление приватного чата
export function deletePrivateChannel(store, action) {
	debugger;
	if (action.privateChannelId) {
		const privateChannels = store.getState().privateChannelState.get('privateChannels');
		const currentPrivateChannel = store.getState().privateChannelState.get('currentPrivateChannel');

		if (privateChannels) {
			const newPrivateChannels = privateChannels.filter(item => item.id !== action.privateChannelId);
			store.dispatch(setPrivateChannels(newPrivateChannels));
		}
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


