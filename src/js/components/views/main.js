'use strict';

import React, { Component } from 'react';
import Menu from './menu';
import QuotesBar from './quotesBar';
import Section from './section';

export default class Main extends Component {

    constructor(props) {
        super(props);

        
    }

    
    render() {
        console.log('render main');
        const className = 'main ' + (this.props.className ? this.props.className : '');

        // массив разделов
        const sectionItems = [];

        let i = 0;  //todo

        debugger;

        this.props.sections.forEach(function(item) {
            const section = <Section
                                key={i}
                            />;
            sectionItems.push(section);
            i++;
        }.bind(this));
        
        return (
            <div className = {className}>
                <Menu/>

                <QuotesBar/>

                {sectionItems}
            </div>
        )
    }
}