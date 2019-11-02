'use strict';

import '../less/template.less';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import App from './components/app';
import store from './store/store';
import apiConst from './constants/apiConst';

//const store = createStore(reducer);
// store.dispatch(setSections(testSectionsData));

const socket = io(`${apiConst.serverUrl}`);
socket.on('state', state => {
    debugger;
    //store.dispatch(setState(state))
});

ReactDOM.render(
    (
        <Provider store={store}>
            <App/>
        </Provider>  
    ),
    document.getElementById("root")
  );