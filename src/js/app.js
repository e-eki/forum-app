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
import BreadcrumbsContainer from './components/containers/BreadcrumbsContainer';
import LoginFormContainer from './components/containers/LoginFormContainer';
import RegistrationFormContainer from './components/containers/RegistrationFormContainer';
import RecoveryPasswordFormContainer from './components/containers/RecoveryPasswordFormContainer';
import EmailConfirmFormContainer from './components/containers/EmailConfirmFormContainer';
import ResetPasswordFormContainer from './components/containers/ResetPasswordFormContainer';
import forumConst from './constants/forumConst';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.history = createBrowserHistory();

    this.state = {
      // 
      modeClassName: 'page_day-mode',
    };

    this.changePageColorTheme = this.changePageColorTheme.bind(this);
  }

  // componentDidMount() {
  //   debugger;
  //   document.body.style.backgroundImage = "url('/images/kola_day.jpg')";  //todo!
  // }

  // изменить тему оформления
  changePageColorTheme(colorTheme) {
    debugger;
    let modeClassName;

    switch (colorTheme) {
      case forumConst.colorThemes.day:
        modeClassName = 'page_day-mode';
        break;

      case forumConst.colorThemes.night:
        modeClassName = 'page_night-mode';
        break;

      default:
        modeClassName = 'page_day-mode';
        break;
    }

    this.setState({
      modeClassName: modeClassName,
    });
  }

  render() {
    debugger;
    //const history = createBrowserHistory();

    const pageClassName = 'page ' + this.state.modeClassName;

    // todo: ???не переходит в ResetPasswordFormContainer по ссылке из письма со сбросом пароля.
      return (
        <div className = {pageClassName}>
          {/* <Header className = 'content__header '/> */}
          <Header/>

          {/* <div className = 'content'> */}
            <Router history={this.history}>

              <AlertFormContainer/>

              <UserInfoFormContainer/>

              <MenuContainer
                changePageColorTheme = {this.changePageColorTheme}
              />

              <SearchFormContainer/>

              <BreadcrumbsContainer/>

              <Switch>
                <Route exact path="/" component={MainContainer} />

                <Route path="/login" component={LoginFormContainer} />
                <Route path="/registration" component={RegistrationFormContainer} />
                <Route path="/recovery-password" component={RecoveryPasswordFormContainer} />
                <Route path="/email-confirm" component={EmailConfirmFormContainer} />
                <Route exact path="/reset-password/:access" component={ResetPasswordFormContainer} />

                <Route exact path="/sections/:id" component={SectionContainer} />
                <Route exact path="/subsections/:id" component={SubSectionContainer} />
                <Route exact path="/channels/:id" component={ChannelContainer} />

                <Route exact strict path="/private-channels" component={PrivateSubSectionContainer} />
                <Route exact path="/private-channels/:id" component={PrivateChannelContainer} />
                <Route strict path="/private-channels/" component={PrivateChannelContainer} />

                <Route strict path="/search" component={SearchResultsContainer} />
                
                <Redirect to="/" />
              </Switch>
            </Router>
          {/* </div> */}

          <Footer className = 'page__footer '/>
        </div>
      )  
  }
}




