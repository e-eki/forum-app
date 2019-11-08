'use strict';

import React, { PureComponent } from 'react';
import Menu from './menu';
import QuotesBar from './quotesBar';
import ListForm from './forms/listForm';
import Section from './section';

export default class Main extends PureComponent {

    constructor(props) {
        super(props);
    }
    
    render() {
        debugger;
        console.log('render main');
        const className = 'main ' + (this.props.className ? this.props.className : '');

        const sections = [];
        let key = 0;

        if (this.props.sections) {
            this.props.sections.forEach(function(item) {
                const section = <Section
                                    key={key}
                                    section = {item}
                                    setCurrentInfoSection = {this.props.setCurrentInfoSection}
                                />;
                sections.push(section);
                key++;
            }.bind(this));
        }
        
        return (
            <div className = {className}>
                <Menu/>

                <QuotesBar/>

                <ListForm
                    items = {sections}
                    currentInfoItem = {this.props.currentInfoSection}
                    setCurrentInfoItem = {this.props.setCurrentInfoSection}
                    modifiableItem = {this.props.modifiableSection}
                    setModifiableItem = {this.props.setModifiableSection}
                    modifyItem = {this.props.modifySection}
                    deleteItem = {this.props.deleteSection}
                />
            </div>
        )
    }
}