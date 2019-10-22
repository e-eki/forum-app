'use strict';

import React, { Component } from 'react';
import Header from './header';
import Main from './main';
import Footer from './footer';

export default class Content extends Component {

    // constructor(props) {
    //     super(props);
    // }

    render() {
        console.log('render content');
        
        const className = 'content ' + (this.props.className ? this.props.className : '');
        
        return (
            <div className = {className}>
                <Header className = 'content__header '/>
                <Main sections = {this.props.sections}/>
                <Footer />
            </div>
        )
    }
}