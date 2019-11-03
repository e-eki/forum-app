'use strict';

import io from 'socket.io-client';
import apiConst from './constants/apiConst';
import * as actionTypes from './actions/actionTypes';
import store from './store/store';
import { setSections } from './actions/sectionActions';

const socket = io(`${apiConst.serverUrl}`);
socket.on('state', state => {
    debugger;
    //store.dispatch(setState(state))
});

socket.on('action', action => {
    debugger;
	
	if (action && action.type && action.data) {
		switch (action.type) {

			case actionTypes.UPDATE_SECTIONS:
				store.dispatch(setSections(action.data));
				break;
			
			default:
				debugger;
				break;
		}
	}
});

export default socket;
