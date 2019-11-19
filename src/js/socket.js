'use strict';

import io from 'socket.io-client';
import apiConst from './constants/apiConst';
import * as actionTypes from './actions/actionTypes';
import store from './store/store';
import { setSections, setCurrentSection } from './actions/sectionActions';
import { setCurrentSubSection } from './actions/subSectionActions';
import { setCurrentChannel } from './actions/channelActions';
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
						debugger; //??
						const section = sections.find(item => item.id === action.sectionId);
						
						if (section) {
							const index = sections.indexOf(section);

							sections[index] = copyUtils.copySection(action.data, section);	
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

				if (action.sectionId) {
					const sections = store.getState().get('sections');
					const currentSection = store.getState().get('currentSection');  //todo!!!!!!! for subSection/channel
					
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

				if (action.subSectionId && action.sectionId && action.data) {
					const sections = store.getState().get('sections');
					const currentSection = store.getState().get('currentSection');
					const currentSubSection = store.getState().get('currentSubSection');

					if (currentSection &&
						(currentSection.id === action.sectionId)) {
							const subSection = currentSection.subSections.find(item => item.id === action.subSectionId);
						
							if (subSection) {
								const index = currentSection.subSections.indexOf(subSection);
								currentSection.subSections[index] = copyUtils.copySubSection(action.data, subSection);
							}
							else {
								currentSection.subSections.push(action.data);
							}

							const newSubSections = currentSection.subSections.slice();
							currentSection.subSections = newSubSections;

							store.dispatch(setCurrentSection(currentSection));   //??
					}
					else if (currentSubSection &&
						(currentSubSection.id === action.subSectionId)) {
							const data = action.data;   //??let
							data.channels = currentSubSection.channels;

							store.dispatch(setCurrentSubSection(data));
					}	
					else if (sections) {
						const section = sections.find(item => item.id === action.sectionId);
						const subSection = section.subSections.find(item => item.id === action.subSectionId);

						if (subSection) {
							const index = sections.indexOf(subSection);

							sections[index] = copyUtils.copySubSection(action.data, subSection);	
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

				if (action.subSectionId && action.sectionId) {
					const sections = store.getState().get('sections');
					const currentSection = store.getState().get('currentSection');
					const currentSubSection = store.getState().get('currentSubSection');  //todo!!!!!!! for channel
					
					if (currentSection &&
						(currentSection.id === action.sectionId)) {
							const newSubSections = currentSection.subSections.filter(item => item.id !== action.subSectionId);
							currentSection.subSections = newSubSections;

							store.dispatch(setCurrentSection(currentSection));  
					}
					else if (currentSubSection &&
						(currentSubSection.id === action.subSectionId)) {
							store.dispatch(setCurrentSubSection(null));  //todo: alert message 'subSection deleted'
					}	
					else if (sections) {
						//??
						const section = sections.find(item => item.id === action.sectionId);
						const newSubSections = section.subSections.filter(item => item.id !== action.subSectionId);
						section.subSections = newSubSections;

						const newSections = sections.slice();

						store.dispatch(setSections(newSections));
					}
				}
					
				break;

			case actionTypes.UPDATE_CHANNEL_BY_ID: //---todo

				if (action.subSectionId && action.channelId && action.data) {
					const currentSubSection = store.getState().get('currentSubSection');
					const currentChannel = store.getState().get('currentChannel');

					if (currentSubSection &&
						(currentSubSection.id === action.subSectionId)) {
							const channel = currentSubSection.channels.find(item => item.id === action.channelId);

							if (channel) {
								const index = currentSubSection.channels.sections.indexOf(channel);

								currentSubSection.channels[index] = copyUtils.copyChannel(action.data, channel);	
							}
							else {
								currentSubSection.channels.push(action.data);
							}

							const newChannels = currentSubSection.channels.slice();

							store.dispatch(setSections(newSections));
					}

					if (currentSubSection &&
						action.subSectionId &&
						(currentSubSection.id === action.subSectionId)) {
							let currentChannel = currentSubSection.channels.find(item => item.id === action.channelId);

							currentChannel = action.data;

							store.dispatch(setCurrentSubSection(currentSubSection));
					}	
					else if (currentChannel &&
						action.channelId &&
						(currentChannel.id === action.channelId)) {
							
							let data = action.data;
							data.messages = currentChannel.messages;

							store.dispatch(setCurrentChannel(data));
					}
				}
				
				break;

			case actionTypes.DELETE_CHANNEL_BY_ID:

				currentSubSection = store.getState().get('currentSubSection');
				currentChannel = store.getState().get('currentChannel');
				
				if (currentSubSection &&
					action.subSectionId &&
					(currentSubSection.id === action.subSectionId)) {
						//todo?? copyChannel
						let newChannels = currentSubSection.channels.filter(item => item.id !== action.channelId);

						currentSubSection.channels = newChannels;

						store.dispatch(setCurrentSubSection(currentSubSection));
				}	
				else if (currentChannel &&
					action.channelId &&
					(currentChannel.id === action.channelId)) {

						store.dispatch(setCurrentChannel(null));  //todo: alert message 'channel deleted'
				}	
				break;

				//TODO: message
				
			
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
