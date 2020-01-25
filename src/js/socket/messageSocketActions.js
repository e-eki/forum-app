'use strict';

import * as copyUtils from '../utils/copyUtils';
import { incrementNewPrivateMessagesCount } from '../actions/notificationActions';
import { setAlertData } from '../actions/alertDataActions';
import * as messageActions from '../actions/messageActions';
import { setCurrentChannel } from '../actions/channelActions';
import { setCurrentPrivateChannel } from '../actions/privateChannelActions';
import { setCurrentSubSection } from '../actions/subSectionActions';

// получение по сокетам действий, связанных с сообщениями

// обновление сообщения
export function updateMessage(store, action) {
	debugger;

	if (action.messageId && action.channelId && action.data) {
		const currentSubSection = store.getState().subSectionState.get('currentSubSection');
		const currentChannel = store.getState().channelState.get('currentChannel');
		const privateChannels = store.getState().privateChannelState.get('privateChannels');
		const currentPrivateChannel = store.getState().privateChannelState.get('currentPrivateChannel');
		const currentInfoMessage = store.getState().messageState.get('currentInfoMessage');
		const modifiableMessage = store.getState().messageState.get('modifiableMessage');
		const userId = store.getState().authState.get('userId');

		// если это личное сообщение и мы не в чате, куда оно пришло, - то инкрементим общее кол-во личных сообщений
		if (action.recipientId &&
			!(currentPrivateChannel &&
			(currentPrivateChannel.id === action.channelId))) {
				store.dispatch(incrementNewPrivateMessagesCount());
		}

		if (action.data.senderId !== userId) { //?
			if (currentInfoMessage &&
				currentInfoMessage.id === action.messageId) {
					const newMessage = copyUtils.copyMessage(action.data);
					store.dispatch(messageActions.setCurrentInfoMessage(newMessage));

					store.dispatch(setAlertData({  //?
						message: 'Редактируемое сообщение было изменено.',
						//link: appConst.defaultLink,
					}));
			}

			if (modifiableMessage &&
				modifiableMessage.id === action.messageId) {
					store.dispatch(messageActions.setModifiableMessage(null));

					store.dispatch(setAlertData({  //?
						message: 'Редактируемое сообщение было изменено.',
						//link: appConst.defaultLink,
					}));
			}
		}

		if (currentChannel &&
			(currentChannel.id === action.channelId)) {
				const message = currentChannel.messages.find(item => item.id === action.messageId);
			
				if (message) {
					const newMessage = copyUtils.copyMessage(action.data);

					const index = currentChannel.messages.indexOf(message);
					currentChannel.messages[index] = newMessage;
				}
				else {
					currentChannel.messages.push(action.data);
				}

				const newCurrentChannel = copyUtils.copyChannel(currentChannel);

				if (action.messageId === currentChannel.descriptionMessageId) {   //?
					newCurrentChannel.descriptionMessage = action.data;
				}

				store.dispatch(setCurrentChannel(newCurrentChannel));
		}
		
		else if (currentPrivateChannel &&
			(currentPrivateChannel.id === action.channelId)) {
				const message = currentPrivateChannel.messages.find(item => item.id === action.messageId);
			
				if (message) {
					const newMessage = copyUtils.copyMessage(action.data);

					const index = currentPrivateChannel.messages.indexOf(message);
					currentPrivateChannel.messages[index] = newMessage;
				}
				else {
					currentPrivateChannel.messages.push(action.data);
				}

				const newCurrentPrivateChannel = copyUtils.copyPrivateChannel(currentPrivateChannel);
				
				if (action.messageId === currentPrivateChannel.descriptionMessageId) {  //?
					newCurrentPrivateChannel.descriptionMessage = action.data;
				}

				store.dispatch(setCurrentPrivateChannel(newCurrentPrivateChannel));
		}
		
		// для уведомлений о новых личных сообщениях
		else if (privateChannels) {
			const privateChannel = privateChannels.find(item => item.id === action.channelId);

			if (privateChannel) {
				const newPrivateChannel = copyUtils.copyPrivateChannel(privateChannel);

				newPrivateChannel.lastMessage = action.data;
				newPrivateChannel.newMessagesCount = privateChannel.newMessagesCount ? privateChannel.newMessagesCount++ : 1;

				const index = privateChannels.indexOf(privateChannel);
				privateChannels[index] = newPrivateChannel;

				const newPrivateChannels = privateChannels.slice();
				store.dispatch(setPrivateChannels(newPrivateChannels));
			}
		}
		// для уведомлений о новых сообщениях
		else if (currentSubSection) {
			const channel = currentSubSection.channels.find(item => item.id === action.channelId);

			if (channel) {
				const newChannel = copyUtils.copyChannel(channel);
				newChannel.lastMessage = action.data;
				newChannel.newMessagesCount = channel.newMessagesCount ? channel.newMessagesCount++ : 1;

				const index = currentSubSection.channels.indexOf(channel);
				currentSubSection.channels[index] = newChannel;

				const newCurrentSubSection = copyUtils.copySubSection(currentSubSection);
				store.dispatch(setCurrentSubSection(newCurrentSubSection));
			}
		}
	}
};


// удаление сообщения
export function deleteMessage(store, action) {
	debugger;
	if (action.messageId && action.channelId) {
		const currentChannel = store.getState().channelState.get('currentChannel');
		const currentPrivateChannel = store.getState().privateChannelState.get('currentPrivateChannel');
		const currentInfoMessage = store.getState().messageState.get('currentInfoMessage');  //todo: то же для section,subsection,channel
		const modifiableMessage = store.getState().messageState.get('modifiableMessage');
		const movingMessage = store.getState().messageState.get('movingMessage');

		if (currentInfoMessage &&
			currentInfoMessage.id === action.messageId) {
				store.dispatch(messageActions.setCurrentInfoMessage(null));

				store.dispatch(setAlertData({  //?
					message: 'Редактируемое сообщение было удалено.',
					//link: appConst.defaultLink,
				}));
		}

		if (modifiableMessage &&
			modifiableMessage.id === action.messageId) {
				store.dispatch(messageActions.setModifiableMessage(null));

				store.dispatch(setAlertData({  //?
					message: 'Редактируемое сообщение было удалено.',
					//link: appConst.defaultLink,
				}));
		}

		if (movingMessage &&
			movingMessage.id === action.messageId) {
				store.dispatch(messageActions.setMovingMessage(null));

				store.dispatch(setAlertData({  //?
					message: 'Перемещаемое сообщение было удалено.',
					//link: appConst.defaultLink,
				}));
		}
		
		if (currentChannel &&
			(currentChannel.id === action.channelId)) {
				const newMessages = currentChannel.messages.filter(item => item.id !== action.messageId)
				
				const newCurrentChannel = copyUtils.copyChannel(currentChannel);
				newCurrentChannel.messages = newMessages;

				if (action.messageId === currentChannel.descriptionMessageId) {   //?
					newCurrentChannel.descriptionMessage = null;
					newCurrentChannel.descriptionMessageId = null;
				}

				store.dispatch(setCurrentChannel(newCurrentChannel));
		}
		else if (currentPrivateChannel &&
			(currentPrivateChannel.id === action.channelId)) {
				const newMessages = currentPrivateChannel.messages.filter(item => item.id !== action.messageId)
				
				const newCurrentPrivateChannel = copyUtils.copyPrivateChannel(currentPrivateChannel);
				newCurrentPrivateChannel.messages = newMessages;

				if (action.messageId === currentPrivateChannel.descriptionMessageId) {   //?
					newCurrentPrivateChannel.descriptionMessage = null;
					newCurrentPrivateChannel.descriptionMessageId = null;
				}

				store.dispatch(setCurrentPrivateChannel(newCurrentPrivateChannel));
		}
	}
};


