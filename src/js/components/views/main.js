'use strict';

import React, { PureComponent } from 'react';
import Menu from './menu';
import QuotesBar from './quotesBar';
import SectionsBar from './sectionsBar';

export default class Main extends PureComponent {

    constructor(props) {
        super(props);
    }
    
    render() {
        debugger;
        console.log('render main');
        const className = 'main ' + (this.props.className ? this.props.className : '');
        
        return (
            <div className = {className}>
                <Menu/>

                <QuotesBar/>

                <SectionsBar
                    sections = {this.props.sections}
                    modifiableSection = {this.props.modifiableSection}
                    setModifiableSection = {this.props.setModifiableSection}
                    modifySection = {this.props.modifySection}
                />
            </div>
        )
    }
}