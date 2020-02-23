'use strict';

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import SubSection from './subSection';
import ListForm from './forms/listForm';
import forumConst from '../../constants/forumConst';

// раздел
export default class Section extends PureComponent {

    constructor(props) {
        super(props);

        this.showInfo = this.showInfo.bind(this);
    }

    // показать информацию и элементы управления разделом
    showInfo() {
        this.props.setCurrentInfoSection(this.props.section);
    }

    render() {
        let className = 'section forum-item ' + (this.props.className ? this.props.className : '');

        // if (this.props.isCurrent) {
        //     className += ' forum-item_not-link';
        // }
        
        debugger;

        let section = <div></div>;

        const subSections = [];
        let key = 0;

        if (this.props.section) {

            if (this.props.section.subSections) {
                this.props.section.subSections.forEach(function(item) {
                    const subSection = <SubSection
                                            key={key}
                                            subSection = {item}
                                            setCurrentInfoSubSection = {this.props.setCurrentInfoSubSection}
                                        />;
                    subSections.push(subSection);
                    key++;
                }.bind(this));
            }

            section = <div>
                        {this.props.isCurrent
                            ?
                            this.props.section.name
                            :
                            <Link to={`/sections/${this.props.section.id}`}>{this.props.section.name}</Link>
                        }
                        
                        {this.props.isCurrent ? <div>{this.props.section.description}</div> : null}

                        <ListForm
                            canAdd = {this.props.section ? this.props.section.canAdd : false}
                            type = {forumConst.itemTypes.subSection}
                            parentItemId = {this.props.section.id}
                            items = {subSections}
                            currentInfoItem = {this.props.currentInfoSubSection}
                            setCurrentInfoItem = {this.props.setCurrentInfoSubSection}
                            modifiableItem = {this.props.modifiableSubSection}
                            movingItem = {this.props.movingSubSection}
                            setModifiableItem = {this.props.setModifiableSubSection}
                            setMovingItem = {this.props.setMovingSubSection}
                            modifyItem = {this.props.modifySubSection}
                            deleteItem = {this.props.deleteSubSection}
                            deletedItemAction = {this.props.deleteSubSectionById}
                            
                            parentItemsList = {this.props.parentItemsList}
                            resetParentItemsList = {this.props.resetParentItemsList}
                        />
                    </div>;
        }

        let sectionInfoBlock = null;

        if (!this.props.isCurrent &&
            (this.props.section && (this.props.section.canEdit || this.props.section.canDelete))) {
                sectionInfoBlock = <button className = '' onClick = {this.showInfo}>
                                        Информация {this.props.section.name ? this.props.section.name : null}
                                    </button>;
        }
        
        return (
            <div className = {className}>
                {section}

                {sectionInfoBlock}
            </div>
        )
    }
}