'use strict';

import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
const createBrowserHistory = require("history").createBrowserHistory;    //?? через import
import ContentContainer from './components/containers/contentContainer';
import SectionContainer from './components/containers/sectionContainer';
import SubSectionContainer from './components/containers/subSectionContainer';
import ChannelContainer from './components/containers/channelContainer';
import MainLayout from './components/layouts/main-layout';

export default class App extends Component {

    render() {
        const history = createBrowserHistory();

        // return (
        //     <Router history={history}>

        //         <Route component={MainLayout}>
        //           <Route exact path="/" component={ContentContainer} />

        //           <Route path="/sections/:id" component={SectionContainer} />
        //           <Route path="/subsections/:id" component={SubSectionContainer} />
        //           <Route path="/channels/:id" component={ChannelContainer} />
                  
        //           <Route path="/userChannels/:userId" component={ChannelContainer} />
        //         </Route>

               
        //     </Router>
        // )

        return (
          // <div>
            <Switch>
              <Route exact path="/" component={ContentContainer} />

              <Route path="/sections/:id" component={SectionContainer} />
              <Route path="/subsections/:id" component={SubSectionContainer} />
              <Route path="/channels/:id" component={ChannelContainer} />

              <Route path="/userChannels/:userId" component={ChannelContainer} />
            </Switch>
            
          // {/* </div> */}
          
      )
    }
}



