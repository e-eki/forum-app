'use strict';

import '../less/template.less';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createStore } from 'redux';
import App from './components/app';
import store from './store/store';
import { getAllSections } from './api/sectionApi';
import reducer from './reducers/reducer';
import testData from '../../test/storeData';
import * as actions from './actions/actions';

//const store = createStore(reducer);

// store.dispatch(setSections(testSectionsData));
//store.dispatch(actions.setSections(testData.sections));

//getAllSections();

ReactDOM.render(
    (
        <Provider store={store}>
            <App/>
        </Provider>  
    ),
    document.getElementById("root")
  );