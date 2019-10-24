'use strict';

import React, { Component } from 'react';
import { Router, Route } from 'react-router';
const createBrowserHistory = require("history").createBrowserHistory;    //?? import
import ContentContainer from './containers/contentContainer';
import SectionContainer from './containers/sectionContainer';

export default class App extends Component {

    render() {

        const history = createBrowserHistory();

        return (
            <Router history={history}>
                <Route exact path="/" component={ContentContainer} />
                <Route path="/sections/:id" component={SectionContainer} />
            </Router>
        )
    }
}




