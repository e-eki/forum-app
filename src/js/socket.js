'use strict';

import io from 'socket.io-client';
import apiConst from './constants/apiConst';
import * as actionTypes from './actions/actionTypes';
import store from './store/store';
import { setSections, setCurrentSection } from './actions/sectionActions';
import { setCurrentSubSection } from './actions/subSectionActions';
import { setCurrentChannel } from './actions/channelActions';

const socket = io(`${apiConst.serverUrl}`);

socket.on('action', action => {
	debugger;
	
	if (action && action.type && action.data) {
		switch (action.type) {

			// case actionTypes.UPDATE_SECTIONS:
			// 	store.dispatch(setSections(action.data));
			// 	break;

			case actionTypes.UPDATE_SECTION_BY_ID:

				let sections = store.getState().get('sections');
				let currentSection = store.getState().get('currentSection');
				
				if (currentSection &&
					action.sectionId &&
					(currentSection.id === action.sectionId)) {
						let data = action.data;
						data.subSections = currentSection.subSections;

						store.dispatch(setCurrentSection(data));
				}	
				else if (sections) {
					//todo?? copySection
					let section = sections.find(item => item.id === action.sectionId);
					section = action.data;

					store.dispatch(setSections(sections));  //изменяется или новое состояние?
				}			
				break;

			case actionTypes.DELETE_SECTION_BY_ID:

				sections = store.getState().get('sections');
				currentSection = store.getState().get('currentSection');
				
				if (currentSection &&
					action.sectionId &&
					(currentSection.id === action.sectionId)) {
						// let data = action.data;
						// data.subSections = currentSection.subSections;

						store.dispatch(setCurrentSection(null));  //todo: alert message 'section deleted'
				}
				else if (sections) {
					//todo??
					let newSections = sections.filter(item => item.id !== action.sectionId);

					store.dispatch(setSections(newSections));
				}
				break;

			case actionTypes.UPDATE_SUBSECTION_BY_ID:

				sections = store.getState().get('sections');
				currentSection = store.getState().get('currentSection');
				let currentSubSection = store.getState().get('currentSubSection');

				if (currentSection &&
					action.sectionId &&
					(currentSection.id === action.sectionId) &&
					action.subSectionId) {
						let data = currentSection;
						let subSection = currentSection.subSections.find(item => item.id === action.subSectionId); //todo??
						
						if (subSection) {
							subSection = action.data;  //????
						}

						store.dispatch(setCurrentSection(data));
				}
				else if (currentSubSection &&
					action.subSectionId &&
					(currentSubSection.id === action.subSectionId)) {
						let data = action.data;
						data.channels = currentSubSection.channels;

						store.dispatch(setCurrentSubSection(data));
				}	
				else if (sections) {
					//todo?? copySubSection
					let section = sections.find(item => item.id === action.sectionId);
					let subSection = section.subSections.find(item => item.id === action.subSectionId);
					subSection = action.data;

					store.dispatch(setSections(sections));
				}			
				break;

			case actionTypes.DELETE_SUBSECTION_BY_ID:

				sections = store.getState().get('sections');
				currentSection = store.getState().get('currentSection');
				let currentSubSection = store.getState().get('currentSubSection');
				
				if (currentSection &&
					action.sectionId &&
					(currentSection.id === action.sectionId)) {
						let data = action.data;
						data.subSections = currentSection.subSections;

						store.dispatch(setCurrentSection(data));  
				}
				else if (currentSubSection &&
					action.subSectionId &&
					(currentSubSection.id === action.subSectionId)) {

						store.dispatch(setCurrentSubSection(null));  //todo: alert message 'subSection deleted'
				}	
				else if (sections) {
					//todo??
					let section = sections.find(item => item.id === action.sectionId);
					let newSubSections = section.subSections.filter(item => item.id !== action.subSectionId);
					section.subSections = newSubSections;

					store.dispatch(setSections(sections));
				}	
				break;

			case actionTypes.UPDATE_CHANNEL_BY_ID:

				let currentSubSection = store.getState().get('currentSubSection');
				let currentChannel = store.getState().get('currentChannel');

				if (currentSubSection &&
					action.subSectionId &&
					(currentSubSection.id === action.subSectionId)) {
						//todo?? copyChannel
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
