'use strict';

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import SubSection from './subSection';

export default class Section extends PureComponent {

    constructor(props) {
        super(props);

        this.editSection = this.editSection.bind(this);
    }

    editSection() {
        debugger;
        this.props.setModifiableSection(this.props.section);
    }

    render() {
        console.log('render section');
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
                        {subSections}
                    </div>;
        }
        
        return (
            <div className = {className}>
                {section}

                <button className = '' onClick = {this.editSection}>
                    Редактировать раздел
                </button>
            </div>
        )
    }
}