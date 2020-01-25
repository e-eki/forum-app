'use strict';

import * as copyUtils from '../utils/copyUtils';
import { setCurrentSubSection } from '../actions/subSectionActions';
import * as channelActions from '../actions/channelActions';
import { setAlertData } from '../actions/alertDataActions';

// получение по сокетам действий, связанных с чатами

// обновление чата
export function updateChannel(store, action) {
	debugger;

	if (action.subSectionId && action.channelId && action.data) {
		const currentSubSection = store.getState().subSectionState.get('currentSubSection');
		const currentChannel = store.getState().channelState.get('currentChannel');
		const currentInfoChannel = store.getState().channelState.get('currentInfoChannel');
		const modifiableChannel = store.getState().channelState.get('modifiableChannel');
		const userId = store.getState().authState.get('userId');

		if (action.data.senderId !== userId) { //?
			if (currentInfoChannel &&
				currentInfoChannel.id === action.channelId) {
					// если изменилось имя или описание чата
					if (action.data.name !== currentInfoChannel.name ||
						action.data.description !== currentInfoChannel.description) {
							const newChannel = copyUtils.copyChannel(action.data);
							store.dispatch(channelActions.setCurrentInfoChannel(newChannel));

							store.dispatch(setAlertData({
								message: 'Редактируемый чат был изменен.',
								//link: appConst.defaultLink,
							}));
						}
			}

			if (modifiableChannel &&
				modifiableChannel.id === action.channelId) {
					// если изменилось имя или описание чата
					if (action.data.name !== currentInfoChannel.name ||
						action.data.description !== currentInfoChannel.description) {
							store.dispatch(channelActions.setModifiableChannel(null));

							store.dispatch(setAlertData({
								message: 'Редактируемый чат был изменен.',
								//link: appConst.defaultLink,
							}));
					}
			}
		}

		if (currentChannel &&
			(currentChannel.id === action.channelId)) {
				const newCurrentChannel = copyUtils.copyChannel(action.data);
				newCurrentChannel.messages = currentChannel.messages;

				store.dispatch(channelActions.setCurrentChannel(newCurrentChannel));
		}
		else if (currentSubSection &&
			(currentSubSection.id === action.subSectionId)) {
				const channel = currentSubSection.channels.find(item => item.id === action.channelId);
			
				if (channel) {
					const newChannel = copyUtils.copyChannel(action.data);
					newChannel.messages = channel.messages;

					const index = currentSubSection.channels.indexOf(channel);
					currentSubSection.channels[index] = newChannel;
				}
				else {
					currentSubSection.channels.push(action.data);
				}

				const newCurrentSubSection = copyUtils.copySubSection(currentSubSection);
				store.dispatch(setCurrentSubSection(newCurrentSubSection));
		}
	}
};


// удаление чата
export function deleteChannel(store, action) {
	debugger;
	if (action.channelId && action.subSectionId) {
		const currentSubSection = store.getState().subSectionState.get('currentSubSection');
		const currentChannel = store.getState().channelState.get('currentChannel');
		const currentInfoChannel = store.getState().channelState.get('currentInfoChannel');
		const modifiableChannel = store.getState().channelState.get('modifiableChannel');
		const movingChannel = store.getState().channelState.get('movingChannel');

		if (currentInfoChannel &&
			currentInfoChannel.id === action.channelId) {
				store.dispatch(channelActions.setCurrentInfoChannel(null));

				store.dispatch(setAlertData({
					message: 'Редактируемый чат был удален.',
					//link: appConst.defaultLink,
				}));
		}

		if (modifiableChannel &&
			modifiableChannel.id === action.channelId) {
				store.dispatch(channelActions.setModifiableChannel(null));

				store.dispatch(setAlertData({
					message: 'Редактируемый чат был удален.',
					//link: appConst.defaultLink,
				}));
		}

		if (movingChannel &&
			movingChannel.id === action.channelId) {
				store.dispatch(channelActions.setMovingChannel(null));

				store.dispatch(setAlertData({
					message: 'Перемещаемый чат был удален.',  //?
				}));
		}
		
		if (currentChannel &&
			(currentChannel.id === action.channelId)) {
				store.dispatch(channelActions.setCurrentChannel(null));

				store.dispatch(setAlertData({  //?
					message: 'Этот чат был удалён.',
					link: appConst.defaultLink,
				}));
		}
		else if (currentSubSection &&
			(currentSubSection.id === action.subSectionId)) {
				const newChannels = currentSubSection.channels.filter(item => item.id !== action.channelId);

				const newCurrentSubSection = copyUtils.copySubSection(currentSubSection);
				newCurrentSubSection.channels = newChannels;

				store.dispatch(setCurrentSubSection(newCurrentSubSection));
		}
	}
};


