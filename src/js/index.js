'use strict';

import '../less/template.less';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/app';
import Store from './store/store';
import { setSections, setCurrentSection } from './actions/actions';

// const store = createStore(Reducer);

// store.dispatch(setSections(testSectionsData));

// store.dispatch(setCurrentSection(testCurrentSectionData));


ReactDOM.render(
    (
        <Provider store={Store}>
            <App/>
        </Provider>  
    ),
    document.getElementById("root")
  );