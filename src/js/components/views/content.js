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
        
        return (
            <div className = {className}>
                <Header className = 'content__header '/>
                <Main  
                    sections = {this.props.sections}
                    modifiableSection = {this.props.modifiableSection}
                    setModifiableSection = {this.props.setModifiableSection}
                    modifySection = {this.props.modifySection}
                />
                <Footer />
            </div>
        )
    }
}