'use strict';

import * as copyUtils from '../utils/copyUtils';
import { setCurrentSubSection } from '../actions/subSectionActions';
import * as channelActions from '../actions/channelActions';
import { setAlertData } from '../actions/alertDataActions';
import { getEditDeleteRightsForItem } from '../utils/rightsUtils';
import forumConst from '../constants/forumConst';
import { getUserId } from '../utils/authUtils';

// получение по сокетам действий, связанных с чатами

// обновление чата
export function updateChannel(store, action) {
	debugger;

	if (action.subSectionId && action.channelId && action.data) {
		const currentSubSection = store.getState().subSectionState.get('currentSubSection');
		const currentChannel = store.getState().channelState.get('currentChannel');
		const currentInfoChannel = store.getState().channelState.get('currentInfoChannel');
		const modifiableChannel = store.getState().channelState.get('modifiableChannel');
		//const userId = store.getState().authState.get('userId');
		const userId = getUserId();  //?

		action.data.type = forumConst.itemTypes.channel;
		const updatedChannel = getEditDeleteRightsForItem(action.data);

		if (!updatedChannel.messages) {  //?
			updatedChannel.messages = [];
		}

		if (updatedChannel.senderId !== userId) { //?
			if (currentInfoChannel &&
				currentInfoChannel.id === action.channelId) {
					// если изменилось имя или описание чата
					if (updatedChannel.name !== currentInfoChannel.name ||
						updatedChannel.description !== currentInfoChannel.description) {
							const newChannel = copyUtils.copyChannel(updatedChannel);
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
					if (updatedChannel.name !== currentInfoChannel.name ||
						updatedChannel.description !== currentInfoChannel.description) {
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
				const newCurrentChannel = copyUtils.copyChannel(updatedChannel);
				newCurrentChannel.messages = currentChannel.messages;

				store.dispatch(channelActions.setCurrentChannel(newCurrentChannel));
		}
		else if (currentSubSection &&
			(currentSubSection.id === action.subSectionId)) {
				const channel = currentSubSection.channels.find(item => item.id === action.channelId);
			
				if (channel) {
					const newChannel = copyUtils.copyChannel(updatedChannel);
					newChannel.messages = channel.messages;

					const index = currentSubSection.channels.indexOf(channel);
					currentSubSection.channels[index] = newChannel;
				}
				else {
					currentSubSection.channels.push(updatedChannel);
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


