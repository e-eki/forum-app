'use strict';

import io from 'socket.io-client';
import apiConst from './constants/apiConst';
import * as actionTypes from './actions/actionTypes';
import store from './store/store';
import { setSections } from './actions/sectionActions';

const socket = io(`${apiConst.serverUrl}`);

socket.on('action', action => {
    debugger;
	
	if (action && action.type) {
		switch (action.type) {

			case actionTypes.UPDATE_SECTIONS:
					console.log('-----------updated');
				store.dispatch(setSections(action.data));
				break;
			
			default:
				debugger;
				break;
		}
	}
});

socket.on('join', action => {
	debugger;
	console.log('-----------joined');
	
	socket.emit('JOINED');
});

export default socket;
