'use strict';

import React, { PureComponent } from 'react';
import Main from './main';

export default class Content extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        debugger;
        //console.log('render content');
        
        const className = 'content ' + (this.props.className ? this.props.className : '');
        
        return (
            <div className = {className}>
                
                <Main  
                    sections = {this.props.sections}
                    currentInfoSection = {this.props.currentInfoSection}
                    setCurrentInfoSection = {this.props.setCurrentInfoSection}
                    modifiableSection = {this.props.modifiableSection}
                    setModifiableSection = {this.props.setModifiableSection}
                    modifySection = {this.props.modifySection}
                    deleteSection = {this.props.deleteSection}

                    currentInfoSubSection = {this.props.currentInfoSubSection}
                    modifiableSubSection = {this.props.modifiableSubSection}
                    setCurrentInfoSubSection = {this.props.setCurrentInfoSubSection}
                    setModifiableSubSection = {this.props.setModifiableSubSection}
                    modifySubSection = {this.props.modifySubSection}
                    deleteSubSection = {this.props.deleteSubSection}
                />
                
            </div>
        )
    }
}
