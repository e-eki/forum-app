'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SubSection from './subSection';
import ListForm from './forms/listForm';

export default class Section extends Component {

    constructor(props) {
        super(props);

        this.showInfo = this.showInfo.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true; //??
    }

    showInfo() {
        debugger;
        this.props.setCurrentInfoSection(this.props.section);
    }

    render() {
        //console.log('render section');
        const className = 'section ' + (this.props.className ? this.props.className : '');
        
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

                        {/* {this.props.isCurrent
                            ?
                            <ListForm
                                parentItemId = {this.props.section.id}
                                items = {subSections}
                                currentInfoItem = {this.props.currentInfoSubSection}
                                setCurrentInfoItem = {this.props.setCurrentInfoSubSection}
                                modifiableItem = {this.props.modifiableSubSection}
                                setModifiableItem = {this.props.setModifiableSubSection}
                                modifyItem = {this.props.modifySubSection}
                                deleteItem = {this.props.deleteSubSection}
                            />
                            :
                            subSections
                        } */}

                        <ListForm
                            type = 'subSection'
                            parentItemId = {this.props.section.id}
                            items = {subSections}
                            currentInfoItem = {this.props.currentInfoSubSection}
                            setCurrentInfoItem = {this.props.setCurrentInfoSubSection}
                            modifiableItem = {this.props.modifiableSubSection}
                            setModifiableItem = {this.props.setModifiableSubSection}
                            modifyItem = {this.props.modifySubSection}
                            deleteItem = {this.props.deleteSubSection}
                        />
                    </div>;
        }

        let sectionInfoBlock = null;

        if (!this.props.isCurrent) {
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