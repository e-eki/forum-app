'use strict';

import * as copyUtils from '../utils/copyUtils';
import { incrementNewPrivateMessagesCount } from '../actions/notificationActions';
import { setAlertData } from '../actions/alertDataActions';
import * as messageActions from '../actions/messageActions';
import { setCurrentChannel } from '../actions/channelActions';
import { setCurrentPrivateChannel, setPrivateChannels } from '../actions/privateChannelActions';
import { setCurrentSubSection } from '../actions/subSectionActions';
import { getEditDeleteRightsForItem } from '../utils/rightsUtils';
import forumConst from '../constants/forumConst';
import appConst from '../constants/appConst';
import { getUserId } from '../utils/authUtils';

// получение по сокетам действий, связанных с сообщениями

// обновление сообщения
export function updateMessage(store, action) {
	debugger;
	//todo: после редактирования закрепленного сообщения у отправителя появляется оповещение об изменении, его не должно быть
	// todo: и после этого пропадает название чата (?)

	if (action.messageId && action.channelId && action.data) {
		const currentSubSection = store.getState().subSectionState.get('currentSubSection');
		const currentChannel = store.getState().channelState.get('currentChannel');
		const privateChannels = store.getState().privateChannelState.get('privateChannels');
		const currentPrivateChannel = store.getState().privateChannelState.get('currentPrivateChannel');
		const currentInfoMessage = store.getState().messageState.get('currentInfoMessage');
		const modifiableMessage = store.getState().messageState.get('modifiableMessage');
		const userId = getUserId();

		debugger;
		action.data.type = forumConst.itemTypes.message;
		const updatedMessage = getEditDeleteRightsForItem(action.data);

		// если это личное сообщение и мы не в чате, куда оно пришло, и юзер не отправитель
		// - то инкрементим общее кол-во личных сообщений
		if (action.recipientId &&
			(updatedMessage.senderId !== userId) &&
			!(currentPrivateChannel &&
			(currentPrivateChannel.id === action.channelId))) {
				store.dispatch(incrementNewPrivateMessagesCount());
		}

		// если юзер не является отправителем (если сообщение было создано) или редактором (если было отредактировано)
		if ((updatedMessage.editorId && updatedMessage.editorId !== userId) ||
			(!updatedMessage.editorId && updatedMessage.senderId !== userId)) {

			// если юзер просматривает информацию сообщения
			if (currentInfoMessage &&
				currentInfoMessage.id === action.messageId) {
					const newMessage = copyUtils.copyMessage(updatedMessage);
					store.dispatch(messageActions.setCurrentInfoMessage(newMessage));

					store.dispatch(setAlertData({
						message: 'Редактируемое сообщение было изменено.',
						//link: appConst.defaultLink,
					}));
			}

			// если юзер редактирует сообщение
			if (modifiableMessage &&
				modifiableMessage.id === action.messageId) {
					store.dispatch(messageActions.setModifiableMessage(null));

					store.dispatch(setAlertData({  //?
						message: 'Редактируемое сообщение было изменено.',
						//link: appConst.defaultLink,
					}));
			}
		}

		// если юзер на странице чата, в котором сообщение
		if (currentChannel &&
			(currentChannel.id === action.channelId)) {
				const message = currentChannel.messages.find(item => item.id === action.messageId);
			
				if (message) {
					const newMessage = copyUtils.copyMessage(updatedMessage);

					const index = currentChannel.messages.indexOf(message);
					currentChannel.messages[index] = newMessage;
				}
				else {
					currentChannel.messages.push(updatedMessage);
				}

				const newCurrentChannel = copyUtils.copyChannel(currentChannel);

				if (action.messageId === currentChannel.descriptionMessageId) {   //?
					newCurrentChannel.descriptionMessage = updatedMessage;
				}

				store.dispatch(setCurrentChannel(newCurrentChannel));
		}
		// если юзер на странице личного чата, в котором сообщение
		else if (currentPrivateChannel &&
			(currentPrivateChannel.id === action.channelId)) {
				const message = currentPrivateChannel.messages.find(item => item.id === action.messageId);
			
				if (message) {
					const newMessage = copyUtils.copyMessage(updatedMessage);

					const index = currentPrivateChannel.messages.indexOf(message);
					currentPrivateChannel.messages[index] = newMessage;
				}
				else {
					currentPrivateChannel.messages.push(updatedMessage);
				}

				const newCurrentPrivateChannel = copyUtils.copyPrivateChannel(currentPrivateChannel);

				// newCurrentPrivateChannel.newMessagesCount++;
				// newCurrentPrivateChannel.lastMessage = updatedMessage;
				
				if (action.messageId === currentPrivateChannel.descriptionMessageId) {  //?
					newCurrentPrivateChannel.descriptionMessage = updatedMessage;
				}

				store.dispatch(setCurrentPrivateChannel(newCurrentPrivateChannel));
		}
		// для уведомлений о новых личных сообщениях
		// если юзер на странице со своими личными чатами
		else if (privateChannels) {
			const privateChannel = privateChannels.find(item => item.id === action.channelId);

			if (privateChannel) {
				const newPrivateChannel = copyUtils.copyPrivateChannel(privateChannel);

				newPrivateChannel.lastMessage = updatedMessage;
				newPrivateChannel.newMessagesCount = privateChannel.newMessagesCount ? privateChannel.newMessagesCount++ : 1;

				const index = privateChannels.indexOf(privateChannel);
				//privateChannels[index] = newPrivateChannel;
				privateChannels.splice(index, 1);
				privateChannels.unshift(newPrivateChannel);

				const newPrivateChannels = privateChannels.slice();
				store.dispatch(setPrivateChannels(newPrivateChannels));
			}
		}
		// для уведомлений о новых сообщениях
		// если юзер на странице подраздела
		else if (currentSubSection) {
			const channel = currentSubSection.channels.find(item => item.id === action.channelId);

			// и в этом подразделе чат, в котором сообщение
			if (channel) {
				const newChannel = copyUtils.copyChannel(channel);
				newChannel.lastMessage = updatedMessage;
				newChannel.newMessagesCount = channel.newMessagesCount ? (channel.newMessagesCount + 1) : 1;

				debugger;
				const index = currentSubSection.channels.indexOf(channel);
				// currentSubSection.channels[index] = newChannel;
				currentSubSection.channels.splice(index, 1);
				currentSubSection.channels.unshift(newChannel);

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

		// если юзер просматривает информацию сообщения
		if (currentInfoMessage &&
			currentInfoMessage.id === action.messageId) {
				store.dispatch(messageActions.setCurrentInfoMessage(null));

				store.dispatch(setAlertData({  //?
					message: 'Редактируемое сообщение было удалено.',
					//link: appConst.defaultLink,
				}));
		}

		// если юзер редактирует сообщение
		if (modifiableMessage &&
			modifiableMessage.id === action.messageId) {
				store.dispatch(messageActions.setModifiableMessage(null));

				store.dispatch(setAlertData({  //?
					message: 'Редактируемое сообщение было удалено.',
					//link: appConst.defaultLink,
				}));
		}

		// если юзер перемещает сообщение
		if (movingMessage &&
			movingMessage.id === action.messageId) {
				store.dispatch(messageActions.setMovingMessage(null));

				store.dispatch(setAlertData({  //?
					message: 'Перемещаемое сообщение было удалено.',
					//link: appConst.defaultLink,
				}));
		}
		
		// если юзер на странице чата, в котором сообщение
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
		// если юзер на странице личного чата, в котором сообщение
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


