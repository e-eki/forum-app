'use strict';

import {createStore, applyMiddleware} from 'redux';
import reducer from '../reducers/reducer';
import remoteActionMiddleware from './remoteActionMiddleware';
import socket from '../socket/initSocket';

const createStoreWithMiddleware = applyMiddleware(
    remoteActionMiddleware(socket)
)(createStore);

const store = createStoreWithMiddleware(reducer);

//const store = createStore(reducer);
export default store;
