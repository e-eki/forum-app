'use strict';

import * as copyUtils from '../utils/copyUtils';
import { getSortedItemsByOrderNumber } from '../utils/sortingUtils';
import { setSections, setCurrentSection } from '../actions/sectionActions';
import { setAlertData } from '../actions/alertDataActions';

// получение по сокетам действий, связанных с разделами

// обновление раздела
export function updateSection(store, action) {
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
};


// удаление раздела
export function deleteSection(store, action) {
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
};


