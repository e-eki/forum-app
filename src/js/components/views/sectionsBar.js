'use strict';

import React, { PureComponent } from 'react';
import Section from './section';
import SectionModifyForm from './forms/sectionModifyForm';

export default class SectionsBar extends PureComponent {

    constructor(props) {
        super(props);

        this.addSection = this.addSection.bind(this);
    }

    addSection() {
        debugger;

        const newSection = {
            name: '',
            description: '',
        };

        this.props.setModifiableSection(newSection);
    }

    render() {
        debugger;
        console.log('render sectionsBar');
        const className = 'sections-bar ' + (this.props.className ? this.props.className : '');

        let modifyingSectionBlock = null;
        // массив разделов
        const sections = [];
        let key = 0;

        if (this.props.modifiableSection) {
            modifyingSectionBlock = <SectionModifyForm
                                        modifiableSection = {this.props.modifiableSection}
                                        setModifiableSection = {this.props.setModifiableSection}
                                        modifySection = {this.props.modifySection}
                                    />;
        }
        else {
            modifyingSectionBlock = <button className = '' onClick = {this.addSection}>
                                        Добавить раздел
                                    </button>;
        }

        if (this.props.sections) {
            this.props.sections.forEach(function(item) {
                const section = <Section
                                    key={key}
                                    section = {item}
                                    setModifiableSection = {this.props.setModifiableSection}
                                />;
                sections.push(section);
                key++;
            }.bind(this));
        }

        return (
            <div className = {className}>

                {modifyingSectionBlock}

                <div>sections-bar</div>

                {sections}
            </div>
        )
    }
}