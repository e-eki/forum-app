'use strict';

import React, { PureComponent } from 'react';
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
                let modifiableSubSection = null;
                let currentInfoSubSection = null;

                if (item.id) {
                    if (this.props.modifiableSubSection &&
                        this.props.modifiableSubSection.sectionId &&
                        (this.props.modifiableSubSection.sectionId === item.id)) {
                            modifiableSubSection = this.props.modifiableSubSection;
                        }

                    if (this.props.currentInfoSubSection &&
                        this.props.currentInfoSubSection.sectionId &&
                        (this.props.currentInfoSubSection.sectionId === item.id)) {
                            currentInfoSubSection = this.props.currentInfoSubSection;
                        }
                }

                const section = <Section
                                    key={key}
                                    section = {item}
                                    setCurrentInfoSection = {this.props.setCurrentInfoSection}

                                    currentInfoSubSection = {currentInfoSubSection}
                                    modifiableSubSection = {modifiableSubSection}
                                    setCurrentInfoSubSection = {this.props.setCurrentInfoSubSection}
                                    setModifiableSubSection = {this.props.setModifiableSubSection}
                                    modifySubSection = {this.props.modifySubSection}
                                    deleteSubSection = {this.props.deleteSubSection}
                                />;
                sections.push(section);
                key++;
            }.bind(this));
        }
        
        return (
            <div className = {className}>

                <ListForm
                    type = 'section'
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