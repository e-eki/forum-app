'use strict';

import '../less/template.less';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createStore } from 'redux';
import App from './components/app';
import Reducer from './reducers/reducer';
import { setSections } from './actions/actions';

const store = createStore(Reducer);

store.dispatch(setSections([1, 2]));

ReactDOM.render(
    (
        <Provider store={store}>
            <App height = {document.documentElement.clientHeight} width = {document.documentElement.clientWidth}/>
        </Provider>  
    ),
    document.getElementById("root")
  );