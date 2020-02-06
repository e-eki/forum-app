'use strict';

import * as copyUtils from '../utils/copyUtils';
import { getSortedItemsByOrderNumber } from '../utils/sortingUtils';
import { setSections, setCurrentSection } from '../actions/sectionActions';
import { setCurrentSubSection } from '../actions/subSectionActions';
import { setAlertData } from '../actions/alertDataActions';
import { getEditDeleteRightsForItem } from '../utils/rightsUtils';
import forumConst from '../constants/forumConst';

// получение по сокетам действий, связанных с подразделами

// обновление подраздела
export function updateSubSection(store, action) {
	debugger;

	if (action.subSectionId && action.sectionId && action.data) {
		const sections = store.getState().sectionState.get('sections');
		const currentSection = store.getState().sectionState.get('currentSection');
		const currentSubSection = store.getState().subSectionState.get('currentSubSection');

		action.data.type = forumConst.itemTypes.subSection;
		const updatedSubSection = getEditDeleteRightsForItem(action.data);

		if (!updatedSubSection.channels) {  //?
			updatedSubSection.channels = [];
		}

		if (currentSubSection &&
			(currentSubSection.id === action.subSectionId)) {
				const newSubSection = copyUtils.copySubSection(updatedSubSection);
				newSubSection.channels = currentSubSection.channels;

				store.dispatch(setCurrentSubSection(newSubSection));
		}
		else if (currentSection &&
			(currentSection.id === action.sectionId)) {
				const subSection = currentSection.subSections.find(item => item.id === action.subSectionId);
			
				if (subSection) {
					const newSubSection = copyUtils.copySubSection(updatedSubSection);
					newSubSection.channels = subSection.channels;

					const index = currentSection.subSections.indexOf(subSection);
					currentSection.subSections[index] = newSubSection;
				}
				else {
					currentSection.subSections.push(updatedSubSection);
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
					const newSubSection = copyUtils.copySubSection(updatedSubSection);
					newSubSection.channels = subSection.channels;

					const index = section.subSections.indexOf(subSection);
					section.subSections[index] = newSubSection;	
				}
				else {
					section.subSections.push(updatedSubSection);
				}

				debugger;
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
};


// удаление подраздела
export function deleteSubSection(store, action) {
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
};


