'use strict';

import React, { Component } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router';
const createBrowserHistory = require("history").createBrowserHistory;    //?? через import
import ContentContainer from './components/containers/contentContainer';
import SectionContainer from './components/containers/sectionContainer';
import SubSectionContainer from './components/containers/subSectionContainer';
import ChannelContainer from './components/containers/channelContainer';
import Header from './components/views/header';
import Menu from './components/views/menu';
import Footer from './components/views/footer';
import AlertFormContainer from './components/containers/alertFormContainer';  //todo!

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

        // return (
        //     <Switch>
        //       <Route exact path="/" component={ContentContainer} />

        //       <Route path="/sections/:id" component={SectionContainer} />
        //       <Route path="/subsections/:id" component={SubSectionContainer} />
        //       <Route path="/channels/:id" component={ChannelContainer} />

        //       <Route path="/userChannels/:userId" component={ChannelContainer} />
        //     </Switch>
        // )

        return (
          <div className="app">
            <Header className = 'content__header '/>
            <Menu/>

            <div className = 'content'>
              <Router history={history}>
                <Switch>
                  <Route exact path="/sections" component={ContentContainer} />

                  <Route exact path="/sections/:id" component={SectionContainer} />
                  <Route exact path="/subsections/:id" component={SubSectionContainer} />
                  <Route exact path="/channels/:id" component={ChannelContainer} />

                  <Route exact path="/userChannels/:userId" component={ChannelContainer} />

                  <Redirect to="/sections" />
                </Switch>
              </Router>
            </div>

            <Footer />
          </div>
        )  
    }
}



