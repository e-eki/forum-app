'use strict';

import React, { PureComponent } from 'react';
import SubSection from './subSection';
import { getSectionById } from '../../api/sectionApi';

export default class Section extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        console.log('render section');
        const className = 'section ' + (this.props.className ? this.props.className : '');
        
        debugger;

        let section = <div></div>;
        const subSections = [];
        let key = 0;

        if (this.props.data) {

            if (this.props.isCurrent && this.props.data.subSections) {
                this.props.data.subSections.forEach(function(item) {
                    const subSection = <SubSection
                                            key={key}
                                            data = {item}
                                        />;
                    subSections.push(subSection);
                    key++;
                });
            }

            section = <div>
                        <div>{this.props.data.name}</div>
                        {this.props.isCurrent ? <div>{this.props.data.description}</div> : null}
                        {this.props.isCurrent ? subSections : null}
                    </div>;
        }
        
        return (
            <div className = {className}>
                {section}
            </div>
        )
    }
}