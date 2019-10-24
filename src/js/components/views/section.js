'use strict';

import React, { Component } from 'react';
import SubSection from './subSection';
import { getSectionById } from '../../api/sectionApi';

export default class Section extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log('render section');
        const className = 'section ' + (this.props.className ? this.props.className : '');
        
        debugger;

        const subSections = [];

        let key = 0;

        if (this.props.isCurrent && this.props.data) {
            this.props.data.subSections.forEach(function(item) {
                const subSection = <SubSection
                                        key={key}
                                        data = {item}
                                    />;
                subSections.push(subSection);
                key++;
            });
        }
        
        return (
            <div className = {className}>
                <div>{this.props.data.name}</div>

                {/* {this.isCurrent ? {subSections} : null} */}
                {subSections}
            </div>
        )
    }
}