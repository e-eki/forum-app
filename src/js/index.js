'use strict';

import '../less/template.less';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createStore } from 'redux';
import App from './components/app';
import Reducer from './reducers/reducer';
import { setSections, setCurrentSection } from './actions/actions';

const store = createStore(Reducer);

const testSectionsData = [
    {
        id: 0,
        name: 'section0',
        subSections: [
            {
                id: 0,
                name: 'sub-section00',
                description: 'subsection-descriprion0',
                channels: [
                    {

                        id: 0,
                        name: 'subSection00 - channel0',
                        description: 'subSection00 - channel0 - descriprion',
                        messages: [
                            {
                                id: 0,
                                senderId: '0',
                                date: new Date(),
                                text: '1111111111 11111 111111',
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

const testCurrentSectionData = [
    {
        id: 0,
        name: 'section0',
        subSections: [
            {
                id: 0,
                name: 'sub-section00',
                description: 'subsection-descriprion0',
                channels: [
                    {

                        id: 0,
                        name: 'subSection00 - channel0',
                        description: 'subSection00 - channel0 - descriprion',
                        messages: [
                            {
                                id: 0,
                                senderId: '0',
                                date: new Date(),
                                text: '1111111111 11111 111111',
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

store.dispatch(setSections(testSectionsData));

store.dispatch(setCurrentSection(testCurrentSectionData));


ReactDOM.render(
    (
        <Provider store={store}>
            <App/>
        </Provider>  
    ),
    document.getElementById("root")
  );