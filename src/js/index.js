'use strict';

import '../less/template.less';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './app';
import store from './store/store';
// import { getUserData } from './api/userApi';
// import { joinRoom } from './actions/remoteActions';
// import { setUserData } from './actions/userActions';


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

// return getUserData()   //?где лучше поместить это?
//     .then(userData => {
//         debugger;
//         if (userData) {
//             store.dispatch(joinRoom(userData.id));

//             store.dispatch(setUserData(userData));
//         }
//     });