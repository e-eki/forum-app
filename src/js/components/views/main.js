'use strict';

import React, { Component } from 'react';
import Menu from './menu';
import QuotesBar from './quotesBar';
import SectionsBar from './sectionsBar';

export default class Main extends Component {

    constructor(props) {
        super(props);
    }

    
    render() {
        console.log('render main');
        const className = 'main ' + (this.props.className ? this.props.className : '');
        
        return (
            <div className = {className}>
                <Menu/>

                <QuotesBar/>

                <SectionsBar sections = {this.props.sections}/>
            </div>
        )
    }
}