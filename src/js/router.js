'use strict';

import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
const createBrowserHistory = require("history").createBrowserHistory;    //?? через import
import MainLayout from './components/layouts/main-layout';
import App from './app';
import ContentContainer from './components/containers/contentContainer';
import SectionContainer from './components/containers/sectionContainer';
import SubSectionContainer from './components/containers/subSectionContainer';
import ChannelContainer from './components/containers/channelContainer';

export default class AppRouter extends Component {

    render() {
        const history = createBrowserHistory();

        return (
            <Router history={history}>

                

                {/* <Switch> */}
                    <Route component={MainLayout}>
                        {/* <App/>  */}
                        <Route exact path="/" component={ContentContainer} />

              <Route path="/sections/:id" component={SectionContainer} />
              <Route path="/subsections/:id" component={SubSectionContainer} />
              <Route path="/channels/:id" component={ChannelContainer} />

              <Route path="/userChannels/:userId" component={ChannelContainer} />
                    </Route>
                {/* </Switch> */}

               
            </Router>
        )
    }
}



