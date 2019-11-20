'use strict';

import io from 'socket.io-client';
import apiConst from './constants/apiConst';
import * as actionTypes from './actions/actionTypes';
import store from './store/store';
import { setSections, setCurrentSection } from './actions/sectionActions';
import { setCurrentSubSection } from './actions/subSectionActions';
import { setCurrentChannel } from './actions/channelActions';
import { setCurrentInfoMessage, setModifiableMessage } from './actions/messageActions';
import * as copyUtils from './lib/copyUtils';

const socket = io(`${apiConst.serverUrl}`);

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
					const sections = store.getState().get('sections');
					const currentSection = store.getState().get('currentSection');
					
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

						const newSections = sections.slice();

						store.dispatch(setSections(newSections));
					}			
				}

				break;

			case actionTypes.DELETE_SECTION_BY_ID:
				debugger;

				if (action.sectionId) {
					const sections = store.getState().get('sections');
					const currentSection = store.getState().get('currentSection');
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
							store.dispatch(setCurrentSection(null));  //todo: alert message
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
					const sections = store.getState().get('sections');
					const currentSection = store.getState().get('currentSection');
					const currentSubSection = store.getState().get('currentSubSection');

					if (currentSubSection &&
						(currentSubSection.id === action.subSectionId)) {
							const data = action.data;   //??let
							data.channels = currentSubSection.channels;

							store.dispatch(setCurrentSubSection(data));
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


							const newSection = copyUtils.copySection(currentSection);  //??
							newSection.subSections = currentSection.subSections;

							// const newSubSections = currentSection.subSections.slice();
							// currentSection.subSections = newSubSections;

							store.dispatch(setCurrentSection(newSection));   //immutable!!!
					}
					else if (sections) {
						const section = sections.find(item => item.id === action.sectionId);
						const subSection = section.subSections.find(item => item.id === action.subSectionId);

						if (subSection) {
							const index = section.subSections.indexOf(subSection);

							section.subSections[index] = copyUtils.copySubSection(action.data, subSection);	
						}
						else {
							section.subSections.push(action.data);
						}

						const newSections = sections.slice();

						store.dispatch(setSections(newSections));
					}
				}

				break;

			case actionTypes.DELETE_SUBSECTION_BY_ID:
				debugger;

				if (action.subSectionId && action.sectionId) {
					const sections = store.getState().get('sections');
					const currentSection = store.getState().get('currentSection');
					const currentSubSection = store.getState().get('currentSubSection');
					// const currentChannel = store.getState().get('currentChannel');
					
					// if (currentChannel && action.channelId &&
					// 	(currentChannel.id === action.channelId)) {
					// 		store.dispatch(setCurrentChannel(null));  //todo: alert message
					// }
					if (currentSubSection &&
						(currentSubSection.id === action.subSectionId)) {
							store.dispatch(setCurrentSubSection(null));  //todo: alert message
					}
					else if (currentSection &&
						(currentSection.id === action.sectionId)) {
							const newSubSections = currentSection.subSections.filter(item => item.id !== action.subSectionId);
							currentSection.subSections = newSubSections;

							store.dispatch(setCurrentSection(currentSection));  
					}
					else if (sections) {
						const section = sections.find(item => item.id === action.sectionId);
						const newSubSections = section.subSections.filter(item => item.id !== action.subSectionId);
						section.subSections = newSubSections;

						const newSections = sections.slice();

						store.dispatch(setSections(newSections));
					}
				}
					
				break;

			case actionTypes.UPDATE_CHANNEL_BY_ID:
				debugger;

				if (action.subSectionId && action.channelId && action.data) {
					const currentSubSection = store.getState().get('currentSubSection');
					const currentChannel = store.getState().get('currentChannel');

					if (currentChannel &&
						(currentChannel.id === action.channelId)) {
							const data = action.data;   //??let
							data.messages = currentChannel.messages;

							store.dispatch(setCurrentChannel(data));
					}
					else if (currentSubSection &&
						(currentSubSection.id === action.subSectionId)) {
							const channel = currentSubSection.channels.find(item => item.id === action.channelId);
						
							if (channel) {
								const index = currentSubSection.channels.indexOf(channel);
								currentSubSection.channels[index] = copyUtils.copyChannel(action.data, channel);
							}
							else {
								currentSubSection.channels.push(action.data);
							}

							const newChannels = currentSubSection.channels.slice();
							currentSubSection.channels = newChannels;

							store.dispatch(setCurrentSubSection(currentSubSection));   //immutable??
					}
				}
				
				break;

			case actionTypes.DELETE_CHANNEL_BY_ID:
				debugger;

				if (action.channelId && action.subSectionId) {
					const currentSubSection = store.getState().get('currentSubSection');
					const currentChannel = store.getState().get('currentChannel');
					
					if (currentChannel &&
						(currentChannel.id === action.channelId)) {
							store.dispatch(setCurrentChannel(null));  //todo: alert message
					}
					else if (currentSubSection &&
						(currentSubSection.id === action.subSectionId)) {
							const newChannels = currentSubSection.channels.filter(item => item.id !== action.channelId);
							currentSubSection.channels = newChannels;

							store.dispatch(setCurrentSubSection(currentSubSection));  //??immutable
					}
				}
					
				break;

			case actionTypes.UPDATE_MESSAGE_BY_ID:
				debugger;

				if (action.messageId && action.channelId && action.data) {
					const currentChannel = store.getState().get('currentChannel');
					const currentInfoMessage = store.getState().get('currentInfoMessage');
					const modifiableMessage = store.getState().get('modifiableMessage');

					if (currentChannel &&
						(currentChannel.id === action.channelId)) {
							const message = currentChannel.messages.find(item => item.id === action.messageId);
						
							if (message) {
								const index = currentChannel.messages.indexOf(message);
								currentChannel.messages[index] = copyUtils.copyMessage(action.data, message);
							}
							else {
								currentChannel.messages.push(action.data);
							}

							const newMessages = currentChannel.messages.slice();
							currentChannel.messages = newMessages;

							store.dispatch(setCurrentChannel(currentChannel));   //immutable??
					}
					else if (currentInfoMessage &&
							currentInfoMessage.id === action.messageId) {
								store.dispatch(setCurrentInfoMessage(action.data));   //todo: alert message 'was edit'
							}
					else if (modifiableMessage &&
							modifiableMessage.id === action.messageId) {
								store.dispatch(setModifiableMessage(action.data));   //todo: alert message 'was edit'
							}
				}
				
				break;

			case actionTypes.DELETE_MESSAGE_BY_ID:
				debugger;

				if (action.messageId && action.channelId) {
					const currentChannel = store.getState().get('currentChannel');
					const currentInfoMessage = store.getState().get('currentInfoMessage');  //todo: то же для section,subsection,channel
					const modifiableMessage = store.getState().get('modifiableMessage');

					if (currentChannel &&
						(currentChannel.id === action.channelId)) {
							const newMessages = currentChannel.messages.filter(item => item.id !== action.messageId)
							currentChannel.messages = newMessages;

							store.dispatch(setCurrentChannel(currentChannel));   //immutable??
					}
					else if (currentInfoMessage &&
							currentInfoMessage.id === action.messageId) {
								store.dispatch(setCurrentInfoMessage(null));   //todo: alert message 'was delete'
							}
					else if (modifiableMessage &&
							modifiableMessage.id === action.messageId) {
								store.dispatch(setModifiableMessage(null));   //todo: alert message 'was delete'
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
