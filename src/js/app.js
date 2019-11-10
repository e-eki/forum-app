'use strict';

import React, { Component } from 'react';
import { Router, Route } from 'react-router';
const createBrowserHistory = require("history").createBrowserHistory;    //?? через import
import ContentContainer from './containers/contentContainer';
import SectionContainer from './containers/sectionContainer';
import SubSectionContainer from './containers/subSectionContainer';
import ChannelContainer from './containers/channelContainer';

export default class App extends Component {

    render() {
        const history = createBrowserHistory();

        return (
            <Router history={history}>
                <Route exact path="/" component={ContentContainer} />
                <Route path="/sections/:id" component={SectionContainer} />
                <Route path="/subsections/:id" component={SubSectionContainer} />
                <Route path="/channels/:id" component={ChannelContainer} />
                
                <Route path="/userChannels/:userId" component={ChannelContainer} />
            </Router>
        )
    }
}




