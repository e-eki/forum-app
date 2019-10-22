'use strict';

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ContentContainer from './containers/contentContainer';

export default class App extends Component {

    render() {

        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={ContentContainer} />  
                    <Route component={ContentContainer} />              
                </Switch>
            </BrowserRouter>
        )
    }
}




