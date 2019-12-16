'use strict';

import React, { Component } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router';
const createBrowserHistory = require("history").createBrowserHistory;    //?? через import
import MainContainer from './components/containers/mainContainer';
import SectionContainer from './components/containers/sectionContainer';
import SubSectionContainer from './components/containers/subSectionContainer';
import ChannelContainer from './components/containers/channelContainer';
import PrivateChannelContainer from './components/containers/privateChannelContainer';
import PrivateSubSectionContainer from './components/containers/PrivateSubSectionContainer';
import Header from './components/views/header';
import MenuContainer from './components/containers/menuContainer';
import Footer from './components/views/footer';
import AlertFormContainer from './components/containers/alertFormContainer';
import UserInfoFormContainer from './components/containers/UserInfoFormContainer';
import SearchResultsContainer from './components/containers/SearchResultsContainer';
import SearchFormContainer from './components/containers/SearchFormContainer';

export default class App extends Component {

    render() {
        const history = createBrowserHistory();

        // return (
        //     <Router history={history}>

        //         <Route component={MainLayout}>
        //           <Route exact path="/" component={MainContainer} />

        //           <Route path="/sections/:id" component={SectionContainer} />
        //           <Route path="/subsections/:id" component={SubSectionContainer} />
        //           <Route path="/channels/:id" component={ChannelContainer} />
                  
        //           <Route path="/userChannels/:userId" component={ChannelContainer} />
        //         </Route>

               
        //     </Router>
        // )


        //todo: <Route exact path="/sections" component={MainContainer} />
        //todo: <Redirect to="/sections" />
        return (
          <div className="app">
            <Header className = 'content__header '/>

            <div className = 'content'>
              <Router history={history}>

                <AlertFormContainer/>

                <UserInfoFormContainer/>

                <MenuContainer/>

                <SearchFormContainer/>

                <Switch>
                  <Route exact path="/" component={MainContainer} />

                  <Route exact path="/sections/:id" component={SectionContainer} />
                  <Route exact path="/subsections/:id" component={SubSectionContainer} />
                  <Route exact path="/channels/:id" component={ChannelContainer} />

                  {/* <Route exact path="/private-channels/:id" component={ChannelContainer} /> */}

                  <Route exact strict path="/private-channels" component={PrivateSubSectionContainer} />
                  <Route exact path="/private-channels/:id" component={PrivateChannelContainer} />
                  <Route strict path="/private-channels/" component={PrivateChannelContainer} />

                  <Route strict path="/search" component={SearchResultsContainer} />
                  
                  
                  <Redirect to="/" />
                </Switch>
              </Router>
            </div>

            <Footer />
          </div>
        )  
    }
}




