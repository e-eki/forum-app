'use strict';

import io from 'socket.io-client';
import apiConst from './constants/apiConst';
import * as actionTypes from './actions/actionTypes';
import store from './store/store';
import { setSections, setCurrentSection } from './actions/sectionActions';
import { setCurrentSubSection } from './actions/subSectionActions';
import { setCurrentChannel } from './actions/channelActions';
import { setCurrentInfoMessage, setModifiableMessage } from './actions/messageActions';
import { setCurrentPrivateChannel } from './actions/privateChannelActions';
import { setAlertData } from './actions/alertDataActions';
import * as copyUtils from './lib/copyUtils';

const socket = io(`${apiConst.serverUrl}`);

const defaultLink = '/';

socket.on('action', action => {
	debugger;
	
	if (action && action.type) {
		switch (action.type) {

			// case actionTypes.UPDATE_SECTIONS:
			// 	store.dispatch(setSections(action.data));
			// 	break;

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

						const newSections = sections.slice();   //! immutable
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
								link: defaultLink,
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

							const newSection = copyUtils.copySection(currentSection);  

							store.dispatch(setCurrentSection(newSection));   //immutable!!!
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

							const newSection = copyUtils.copySection(section);

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
								link: defaultLink,
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
					
					if (currentChannel &&
						(currentChannel.id === action.channelId)) {
							store.dispatch(setCurrentChannel(null));

							store.dispatch(setAlertData({  //?
								message: 'Этот чат был удалён.',
								link: defaultLink,
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
					const currentChannel = store.getState().channelState.get('currentChannel');
					const currentPrivateChannel = store.getState().privateChannelState.get('currentPrivateChannel');
					const currentInfoMessage = store.getState().messageState.get('currentInfoMessage');
					const modifiableMessage = store.getState().messageState.get('modifiableMessage');

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

							//const newMessages = currentChannel.messages.slice();  //?
							const newCurrentChannel = copyUtils.copyChannel(currentChannel);
							//newCurrentChannel.messages = newMessages;

							store.dispatch(setCurrentChannel(newCurrentChannel));   //?
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

							//const newMessages = currentChannel.messages.slice();  //?
							const newCurrentPrivateChannel = copyUtils.copyChannel(currentPrivateChannel);
							//newCurrentChannel.messages = newMessages;

							store.dispatch(setCurrentPrivateChannel(newCurrentPrivateChannel));   //?
					}
					else if (currentInfoMessage &&
							currentInfoMessage.id === action.messageId) {
								const newMessage = copyUtils.copyMessage(action.data);
								store.dispatch(setCurrentInfoMessage(newMessage));

								store.dispatch(setAlertData({  //?
									message: 'Это сообщение было отредактировано.',
									link: defaultLink,
								}));
							}
					else if (modifiableMessage &&
							modifiableMessage.id === action.messageId) {
								const newMessage = copyUtils.copyMessage(action.data);
								store.dispatch(setModifiableMessage(newMessage));

								store.dispatch(setAlertData({  //?
									message: 'Это сообщение было отредактировано.',
									link: defaultLink,
								}));
							}
				}
				
				break;

			case actionTypes.DELETE_MESSAGE_BY_ID:
				debugger;

				if (action.messageId && action.channelId) {
					const currentChannel = store.getState().channelState.get('currentChannel');
					const currentInfoMessage = store.getState().messageState.get('currentInfoMessage');  //todo: то же для section,subsection,channel
					const modifiableMessage = store.getState().messageState.get('modifiableMessage');

					if (currentChannel &&
						(currentChannel.id === action.channelId)) {
							const newMessages = currentChannel.messages.filter(item => item.id !== action.messageId)
							
							const newCurrentChannel = copyUtils.copyChannel(currentChannel);
							newCurrentChannel.messages = newMessages;

							store.dispatch(setCurrentChannel(newCurrentChannel));   //?
					}
					else if (currentInfoMessage &&
							currentInfoMessage.id === action.messageId) {
								store.dispatch(setCurrentInfoMessage(null));

								store.dispatch(setAlertData({  //?
									message: 'Это сообщение было удалено.',
									link: defaultLink,
								}));
							}
					else if (modifiableMessage &&
							modifiableMessage.id === action.messageId) {
								store.dispatch(setModifiableMessage(null));

								store.dispatch(setAlertData({  //?
									message: 'Это сообщение было удалено.',
									link: defaultLink,
								}));
							}
				}
				
				break;

			case actionTypes.UPDATE_PRIVATE_CHANNEL_BY_ID:
				debugger;

				if (action.privateChannelId && action.data) {
					const currentPrivateChannel = store.getState().privateChannelState.get('currentPrivateChannel');

					if (currentPrivateChannel &&
						(currentPrivateChannel.id === action.privateChannelId)) {
							const newCurrentPrivateChannel = copyUtils.copyPrivateChannel(action.data);
							newCurrentChannel.messages = currentPrivateChannel.messages;

							store.dispatch(setCurrentPrivateChannel(newCurrentPrivateChannel));
					}
				}
				
				break;

			case actionTypes.DELETE_PRIVATE_CHANNEL_BY_ID:
				debugger;

				if (action.privateChannelId) {
					const currentPrivateChannel = store.getState().privateChannelState.get('currentPrivateChannel');

					if (currentPrivateChannel &&
						(currentPrivateChannel.id === action.privateChannelId)) {
							store.dispatch(setCurrentPrivateChannel(null));     //?

							store.dispatch(setAlertData({
								message: 'Этот чат был удалён.',
								link: defaultLink,
							}));
					}
				}

				//todo: и в списке личных чатов юзера
				
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
