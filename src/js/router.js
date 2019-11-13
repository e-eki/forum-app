'use strict';

import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
const createBrowserHistory = require("history").createBrowserHistory;    //?? через import
import MainLayout from './components/layouts/main-layout';
import App from './app';

export default class AppRouter extends Component {

    render() {
        const history = createBrowserHistory();

        return (
            <Router history={history}>

                

                {/* <Switch> */}
                    <Route component={MainLayout}>
                        <App/> 
                    </Route>
                {/* </Switch> */}

               
            </Router>
        )
    }
}



