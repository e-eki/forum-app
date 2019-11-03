'use strict';

import '../less/template.less';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/app';
import store from './store/store';

//const store = createStore(reducer);
// store.dispatch(setSections(testSectionsData));

// const socket = io(`${apiConst.serverUrl}`);
// socket.on('state', state => {
//     //store.dispatch(setState(state))
// });


ReactDOM.render(
    (
        <Provider store={store}>
            <App/>
        </Provider>  
    ),
    document.getElementById("root")
  );