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
							const newSections = sections.slice();

							store.dispatch(setSections(newSections));  //изменяется или новое состояние?
						}
					}			
				}

				break;

			case actionTypes.DELETE_SECTION_BY_ID:

				if (action.sectionId) {
					sections = store.getState().get('sections');
					currentSection = store.getState().get('currentSection');
					
					if (currentSection &&
						(currentSection.id === action.sectionId)) {
							store.dispatch(setCurrentSection(null));  //todo: alert message 'section deleted'
					}
					else if (sections) {
						//??
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

							store.dispatch(setCurrentSection(currentSection));
					}
					else if (currentSubSection &&
						(currentSubSection.id === action.subSectionId)) {
							const data = action.data;   //??let
							data.channels = currentSubSection.channels;

							store.dispatch(setCurrentSubSection(data));
					}	
					else if (sections) {
						//??
						const section = sections.find(item => item.id === action.sectionId);
						const subSection = section.subSections.find(item => item.id === action.subSectionId);
						
						const index = section.subSections.indexOf(subSection);
						section.subSections[index] = copyUtils.copySubSection(action.data, subSection);

						store.dispatch(setSections(sections));  //??
					}
				}

				break;

			case actionTypes.DELETE_SUBSECTION_BY_ID:

				if (action.subSectionId && action.sectionId) {
					const sections = store.getState().get('sections');
					const currentSection = store.getState().get('currentSection');
					const currentSubSection = store.getState().get('currentSubSection');
					
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

						store.dispatch(setSections(sections));  //??
					}
				}
					
				break;

			// case actionTypes.UPDATE_CHANNEL_BY_ID:

			// 	let currentSubSection = store.getState().get('currentSubSection');
			// 	let currentChannel = store.getState().get('currentChannel');

			// 	if (currentSubSection &&
			// 		action.subSectionId &&
			// 		(currentSubSection.id === action.subSectionId)) {
			// 			let currentChannel = currentSubSection.channels.find(item => item.id === action.channelId);

			// 			currentChannel = action.data;

			// 			store.dispatch(setCurrentSubSection(currentSubSection));
			// 	}	
			// 	else if (currentChannel &&
			// 		action.channelId &&
			// 		(currentChannel.id === action.channelId)) {
						
			// 			let data = action.data;
			// 			data.messages = currentChannel.messages;

			// 			store.dispatch(setCurrentChannel(data));
			// 	}			
			// 	break;

			// case actionTypes.DELETE_CHANNEL_BY_ID:

			// 	currentSubSection = store.getState().get('currentSubSection');
			// 	currentChannel = store.getState().get('currentChannel');
				
			// 	if (currentSubSection &&
			// 		action.subSectionId &&
			// 		(currentSubSection.id === action.subSectionId)) {
			// 			//todo?? copyChannel
			// 			let newChannels = currentSubSection.channels.filter(item => item.id !== action.channelId);

			// 			currentSubSection.channels = newChannels;

			// 			store.dispatch(setCurrentSubSection(currentSubSection));
			// 	}	
			// 	else if (currentChannel &&
			// 		action.channelId &&
			// 		(currentChannel.id === action.channelId)) {

			// 			store.dispatch(setCurrentChannel(null));  //todo: alert message 'channel deleted'
			// 	}	
			// 	break;

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
