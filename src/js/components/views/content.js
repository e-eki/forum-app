'use strict';

import React, { PureComponent } from 'react';
import Header from './header';
import Main from './main';
import Footer from './footer';

export default class Content extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        debugger;
        console.log('render content');
        
        const className = 'content ' + (this.props.className ? this.props.className : '');
        let mainClassName = '';

        if (this.props.userInfo) {
            mainClassName = ''
        }
        
        return (
            <div className = {className}>
                <Header className = 'content__header '/>
                <Main userInfo = {this.props.userInfo} sections = {this.props.sections}/>
                <Footer />
            </div>
        )
    }
}