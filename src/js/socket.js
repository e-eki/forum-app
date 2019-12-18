'use strict';

import io from 'socket.io-client';
import apiConst from './constants/apiConst';
import * as actionTypes from './actions/actionTypes';
import store from './store/store';
import { setSections, setCurrentSection } from './actions/sectionActions';
import { setCurrentSubSection } from './actions/subSectionActions';
import { setCurrentChannel, setCurrentInfoChannel, setModifiableChannel, setMovingChannel } from './actions/channelActions';
import { setCurrentInfoMessage, setModifiableMessage, setMovingMessage } from './actions/messageActions';
import { setCurrentPrivateChannel, setPrivateChannels } from './actions/privateChannelActions';
import { setAlertData } from './actions/alertDataActions';
import { incrementNewPrivateMessagesCount } from './actions/notificationActions';
import * as copyUtils from './lib/copyUtils';
import appConst from './constants/appConst';
import { getSortedItemsByOrderNumber } from './lib/sortingUtils';

const socket = io(`${apiConst.serverUrl}`);

socket.on('action', action => {
	debugger;
	
	if (action && action.type) {
		switch (action.type) {

			case actionTypes.UPDATE_SECTION_BY_ID:
				debugger;

				if (action.sectionId && action.data) {
					const sections = store.getState().sectionState.get('sections');
					const currentSection = store.getState().sectionState.get('currentSection');
					
					if (currentSection &&
						(currentSection.id === action.sectionId)) {
							let data = action.data;
							data.subSections = currentSection.subSections;

							store.dispatch(setCurrentSection(data));
					}	
					else if (sections) {
						const section = sections.find(item => item.id === action.sectionId);
						
						if (section) {
							const newSection = copyUtils.copySection(action.data);   //! immutable section
							newSection.subSections = section.subSections;

							const index = sections.indexOf(section);
							sections[index] = newSection;
						}
						else {
							sections.push(action.data);
						}

						// если был изменен раздел, то порядок разделов мог измениться, сортируем их по номеру
						const newSections = section
											?
											getSortedItemsByOrderNumber(sections.slice())
											:
											sections.slice();

						store.dispatch(setSections(newSections));
					}		
				}

				break;

			case actionTypes.DELETE_SECTION_BY_ID:
				debugger;

				if (action.sectionId) {
					const sections = store.getState().sectionState.get('sections');
					const currentSection = store.getState().sectionState.get('currentSection');
					// const currentSubSection = store.getState().get('currentSubSection');
					// const currentChannel = store.getState().get('currentChannel');

					// if (currentChannel && action.channelId &&
					// 	(currentChannel.id === action.channelId)) {
					// 		store.dispatch(setCurrentChannel(null));  //todo: alert message
					// }
					// else if (currentSubSection && action.subSectionId &&
					// 	(currentSubSection.id === action.subSectionId)) {
					// 		store.dispatch(setCurrentSubSection(null));  //todo: alert message
					// }
					if (currentSection &&
						(currentSection.id === action.sectionId)) {
							store.dispatch(setCurrentSection(null));

							store.dispatch(setAlertData({  //?
								message: 'Этот раздел был удалён.',
								link: appConst.appConst.defaultLink,
							}));
					}
					else if (sections) {
						const newSections = sections.filter(item => item.id !== action.sectionId);
						store.dispatch(setSections(newSections));
					}
				}
				
				break;

			case actionTypes.UPDATE_SUBSECTION_BY_ID:
				debugger;

				if (action.subSectionId && action.sectionId && action.data) {
					const sections = store.getState().sectionState.get('sections');
					const currentSection = store.getState().sectionState.get('currentSection');
					const currentSubSection = store.getState().subSectionState.get('currentSubSection');

					if (currentSubSection &&
						(currentSubSection.id === action.subSectionId)) {
							const newSubSection = copyUtils.copySubSection(action.data);
							newSubSection.channels = currentSubSection.channels;

							store.dispatch(setCurrentSubSection(newSubSection));
					}
					else if (currentSection &&
						(currentSection.id === action.sectionId)) {
							const subSection = currentSection.subSections.find(item => item.id === action.subSectionId);
						
							if (subSection) {
								const newSubSection = copyUtils.copySubSection(action.data);
								newSubSection.channels = subSection.channels;

								const index = currentSection.subSections.indexOf(subSection);
								currentSection.subSections[index] = newSubSection;
							}
							else {
								currentSection.subSections.push(action.data);
							}

							// если был изменен подраздел, то порядок подразделов мог измениться, сортируем их по номеру
							const newSubSections = subSection
													?
													getSortedItemsByOrderNumber(currentSection.subSections.slice())
													:
													currentSection.subSections.slice();

							const newSection = copyUtils.copySection(currentSection);
							newSection.subSections = newSubSections;

							store.dispatch(setCurrentSection(newSection));
					}
					else if (sections) {
						const section = sections.find(item => item.id === action.sectionId);

						if (section) {
							const subSection = section.subSections.find(item => item.id === action.subSectionId);

							if (subSection) {
								const newSubSection = copyUtils.copySubSection(action.data);
								newSubSection.channels = subSection.channels;

								const index = section.subSections.indexOf(subSection);
								section.subSections[index] = newSubSection;	
							}
							else {
								section.subSections.push(action.data);
							}

							// если был изменен подраздел, то порядок подразделов мог измениться, сортируем их по номеру
							const newSubSections = subSection
													?
													getSortedItemsByOrderNumber(section.subSections.slice())
													:
													section.subSections.slice();

							const newSection = copyUtils.copySection(section);
							newSection.subSections = newSubSections;

							const index = sections.indexOf(section);
							sections[index] = newSection;

							const newSections = sections.slice();
							store.dispatch(setSections(newSections));
						}
					}
				}

				break;

			case actionTypes.DELETE_SUBSECTION_BY_ID:
				debugger;

				if (action.subSectionId && action.sectionId) {
					const sections = store.getState().sectionState.get('sections');
					const currentSection = store.getState().sectionState.get('currentSection');
					const currentSubSection = store.getState().subSectionState.get('currentSubSection');
					// const currentChannel = store.getState().get('currentChannel');
					
					// if (currentChannel && action.channelId &&
					// 	(currentChannel.id === action.channelId)) {
					// 		store.dispatch(setCurrentChannel(null));  //todo: alert message
					// }
					if (currentSubSection &&
						(currentSubSection.id === action.subSectionId)) {
							store.dispatch(setCurrentSubSection(null));

							store.dispatch(setAlertData({  //?
								message: 'Этот подраздел был удалён.',
								link: appConst.defaultLink,
							}));
					}
					else if (currentSection &&
						(currentSection.id === action.sectionId)) {
							const newSubSections = currentSection.subSections.filter(item => item.id !== action.subSectionId);

							const newCurrentSection = copyUtils.copySection(currentSection);
							newCurrentSection.subSections = newSubSections;

							store.dispatch(setCurrentSection(newCurrentSection));
					}
					else if (sections) {
						const section = sections.find(item => item.id === action.sectionId);

						if (section) {
							const newSubSections = section.subSections.filter(item => item.id !== action.subSectionId);
							
							const newSection = copyUtils.copySection(section);
							newSection.subSections = newSubSections;

							const index = sections.indexOf(section);
							sections[index] = newSection;

							const newSections = sections.slice();

							store.dispatch(setSections(newSections));
						}
					}
				}
					
				break;

			case actionTypes.UPDATE_CHANNEL_BY_ID:
				debugger;

				if (action.subSectionId && action.channelId && action.data) {
					const currentSubSection = store.getState().subSectionState.get('currentSubSection');
					const currentChannel = store.getState().channelState.get('currentChannel');
					const currentInfoChannel = store.getState().channelState.get('currentInfoChannel');
					const modifiableChannel = store.getState().channelState.get('modifiableChannel');

					if (action.data.senderId !== 0) { //todo! userId вместо 0
						if (currentInfoChannel &&
							currentInfoChannel.id === action.channelId) {
								// если изменилось имя или описание чата
								if (action.data.name !== currentInfoChannel.name ||
									action.data.description !== currentInfoChannel.description) {
										const newChannel = copyUtils.copyChannel(action.data);
										store.dispatch(setCurrentInfoChannel(newChannel));
			
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
										store.dispatch(setModifiableChannel(null));

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

							store.dispatch(setCurrentChannel(newCurrentChannel));
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
				
				break;

			case actionTypes.DELETE_CHANNEL_BY_ID:
				debugger;

				if (action.channelId && action.subSectionId) {
					const currentSubSection = store.getState().subSectionState.get('currentSubSection');
					const currentChannel = store.getState().channelState.get('currentChannel');
					const currentInfoChannel = store.getState().channelState.get('currentInfoChannel');
					const modifiableChannel = store.getState().channelState.get('modifiableChannel');
					const movingChannel = store.getState().channelState.get('movingChannel');

					if (currentInfoChannel &&
						currentInfoChannel.id === action.channelId) {
							store.dispatch(setCurrentInfoChannel(null));

							store.dispatch(setAlertData({
								message: 'Редактируемый чат был удален.',
								//link: appConst.defaultLink,
							}));
					}

					if (modifiableChannel &&
						modifiableChannel.id === action.channelId) {
							store.dispatch(setModifiableChannel(null));

							store.dispatch(setAlertData({
								message: 'Редактируемый чат был удален.',
								//link: appConst.defaultLink,
							}));
					}

					if (movingChannel &&
						movingChannel.id === action.channelId) {
							store.dispatch(setMovingChannel(null));

							store.dispatch(setAlertData({
								message: 'Перемещаемый чат был удален.',  //?
							}));
					}
					
					if (currentChannel &&
						(currentChannel.id === action.channelId)) {
							store.dispatch(setCurrentChannel(null));

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
					
				break;

			case actionTypes.UPDATE_MESSAGE_BY_ID:
				debugger;

				if (action.messageId && action.channelId && action.data) {
					const currentSubSection = store.getState().subSectionState.get('currentSubSection');
					const currentChannel = store.getState().channelState.get('currentChannel');
					const privateChannels = store.getState().privateChannelState.get('privateChannels');
					const currentPrivateChannel = store.getState().privateChannelState.get('currentPrivateChannel');
					const currentInfoMessage = store.getState().messageState.get('currentInfoMessage');
					const modifiableMessage = store.getState().messageState.get('modifiableMessage');

					// если это личное сообщение и мы не в чате, куда оно пришло, - то инкрементим общее кол-во личных сообщений
					if (action.recipientId &&
						!(currentPrivateChannel &&
						(currentPrivateChannel.id === action.channelId))) {
							store.dispatch(incrementNewPrivateMessagesCount());
					}

					if (action.data.senderId !== 0) { //todo! userId вместо 0
						if (currentInfoMessage &&
							currentInfoMessage.id === action.messageId) {
								const newMessage = copyUtils.copyMessage(action.data);
								store.dispatch(setCurrentInfoMessage(newMessage));
	
								store.dispatch(setAlertData({  //?
									message: 'Редактируемое сообщение было изменено.',
									//link: appConst.defaultLink,
								}));
						}

						if (modifiableMessage &&
							modifiableMessage.id === action.messageId) {
								store.dispatch(setModifiableMessage(null));

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
				
				break;

			case actionTypes.DELETE_MESSAGE_BY_ID:
				debugger;

				if (action.messageId && action.channelId) {
					const currentChannel = store.getState().channelState.get('currentChannel');
					const currentPrivateChannel = store.getState().privateChannelState.get('currentPrivateChannel');
					const currentInfoMessage = store.getState().messageState.get('currentInfoMessage');  //todo: то же для section,subsection,channel
					const modifiableMessage = store.getState().messageState.get('modifiableMessage');
					const movingMessage = store.getState().messageState.get('movingMessage');

					if (currentInfoMessage &&
						currentInfoMessage.id === action.messageId) {
							store.dispatch(setCurrentInfoMessage(null));

							store.dispatch(setAlertData({  //?
								message: 'Редактируемое сообщение было удалено.',
								//link: appConst.defaultLink,
							}));
					}

					if (modifiableMessage &&
						modifiableMessage.id === action.messageId) {
							store.dispatch(setModifiableMessage(null));

							store.dispatch(setAlertData({  //?
								message: 'Редактируемое сообщение было удалено.',
								//link: appConst.defaultLink,
							}));
					}

					if (movingMessage &&
						movingMessage.id === action.messageId) {
							store.dispatch(setMovingMessage(null));

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
				
				break;

			//todo: ?сделать, чтоб не рендерился дважды чат в списке ЛС, когда одно событие приходит как currentChannel и как recipientId
			case actionTypes.UPDATE_PRIVATE_CHANNEL_BY_ID:
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
				
				break;

			case actionTypes.DELETE_PRIVATE_CHANNEL_BY_ID:
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
				
				break;

			default:
				debugger;
				break;
		}
	}
});

// socket.on('join', action => {
// 	debugger;
	
// 	socket.emit('JOINED');
// });

export default socket;
