'use strict';

import React, { PureComponent } from 'react';
import Section from './section';

export default class SectionsBar extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        debugger;
        console.log('render sectionsBar');
        const className = 'sections-bar ' + (this.props.className ? this.props.className : '');

        // массив разделов
        const sections = [];

        let key = 0;

        //debugger;

        if (this.props.sections) {
            this.props.sections.forEach(function(item) {
                const section = <Section
                                    key={key}
                                    data = {item}
                                />;
                sections.push(section);
                key++;
            });  //.bind(this)
        }

        return (
            <div className = {className}>
                <div>sections-bar</div>

                {sections}
            </div>
        )
    }
}