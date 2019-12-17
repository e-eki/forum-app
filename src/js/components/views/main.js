'use strict';

import React, { PureComponent } from 'react';
import ListForm from './forms/listForm';
import Section from './section';
import forumConst from '../../constants/forumConst';

export default class Main extends PureComponent {

    constructor(props) {
        super(props);
    }
    
    render() {
        debugger;
        //console.log('render main');
        const className = 'main ' + (this.props.className ? this.props.className : '');

        const sections = [];
        let key = 0;

        if (this.props.sections) {
            this.props.sections.forEach(function(item) {
                let modifiableSubSection = null;
                let currentInfoSubSection = null;
                let movingSubSection = null;

                if (item.id) {
                    if (this.props.modifiableSubSection) {
                        const parentId = this.props.modifiableSubSection.parentItemId || this.props.modifiableSubSection.sectionId;

                        if (parentId && parentId === item.id) {
                            modifiableSubSection = this.props.modifiableSubSection;
                        }
                    }

                    if (this.props.currentInfoSubSection) {
                        const parentId = this.props.currentInfoSubSection.parentItemId || this.props.currentInfoSubSection.sectionId;

                        if (parentId && parentId === item.id) {
                            currentInfoSubSection = this.props.currentInfoSubSection;
                        }
                    }

                    if (this.props.movingSubSection) {
                        const parentId = this.props.movingSubSection.parentItemId || this.props.movingSubSection.sectionId;

                        if (parentId && parentId === item.id) {
                            movingSubSection = this.props.movingSubSection;
                        }
                    }
                }

                const section = <Section
                                    key={key}
                                    section = {item}
                                    setCurrentInfoSection = {this.props.setCurrentInfoSection}

                                    currentInfoSubSection = {currentInfoSubSection}
                                    modifiableSubSection = {modifiableSubSection}
                                    movingSubSection = {movingSubSection}
                                    setCurrentInfoSubSection = {this.props.setCurrentInfoSubSection}
                                    setModifiableSubSection = {this.props.setModifiableSubSection}
                                    setMovingSubSection = {this.props.setMovingSubSection}
                                    modifySubSection = {this.props.modifySubSection}
                                    deleteSubSection = {this.props.deleteSubSection}

                                    parentItemsList = {this.props.parentItemsList}
                                    resetParentItemsList = {this.props.resetParentItemsList}
                                />;
                sections.push(section);
                key++;
            }.bind(this));
        }
        
        return (
            <div className = {className}>

                <ListForm
                    type = {forumConst.itemTypes.section}
                    items = {sections}
                    currentInfoItem = {this.props.currentInfoSection}
                    setCurrentInfoItem = {this.props.setCurrentInfoSection}
                    modifiableItem = {this.props.modifiableSection}
                    movingItem = {this.props.movingSection}
                    setModifiableItem = {this.props.setModifiableSection}
                    setMovingItem = {this.props.setMovingSection}
                    modifyItem = {this.props.modifySection}
                    deleteItem = {this.props.deleteSection}

                    parentItemsList = {this.props.parentItemsList}
                    resetParentItemsList = {this.props.resetParentItemsList}
                />
            </div>
        )
    }
}