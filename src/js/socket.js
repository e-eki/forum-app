'use strict';

import io from 'socket.io-client';
import apiConst from './constants/apiConst';
import * as actionTypes from './actions/actionTypes';
import store from './store/store';
import * as sectionActions from './actions/sectionActions';

const socket = io(`${apiConst.serverUrl}`);

socket.on('action', action => {
    debugger;
	
	if (action && action.type) {
		switch (action.type) {

			case actionTypes.UPDATE_SECTIONS:
				store.dispatch(setSections(action.data));
				break;

			case actionTypes.UPDATE_SECTION_BY_ID:

				const currentSection = store.getState().get('currentSection');
				
				if (currentSection &&
					action.sectionId &&
					(currentSection === action.sectionId)) {
						let data = action.data;
						data.subSections = currentSection.subSections;

						store.dispatch(sectionActions.setCurrentSection(data));
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
