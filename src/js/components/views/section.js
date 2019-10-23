'use strict';

import React, { Component } from 'react';
import SubSection from './subSection';

export default class Section extends Component {

    constructor(props) {
        super(props);

        this.isCurrent = false;
    }

    componentWillMount() {
        debugger;

        if (this.props.match && this.props.match.params) {
            const id = this.props.match.params.id;
            //getSectionById(id);
            this.isCurrent = true;
        }
    }

    // getSectionById() {
    // }

    render() {
        console.log('render section');
        const className = 'section ' + (this.props.className ? this.props.className : '');
        
        debugger;

        const subSections = [];

        let key = 0;

        if (this.isCurrent && this.props.data) {
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