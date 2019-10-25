'use strict';

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import SubSection from './subSection';

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

            if (this.props.data.subSections) {
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
                        {this.props.isCurrent 
                            ?
                            this.props.data.name
                            :
                            <Link to={`/sections/${this.props.data.id}`}>{this.props.data.name}</Link>
                        }
                        
                        {this.props.isCurrent ? <div>{this.props.data.description}</div> : null}
                        {subSections}
                    </div>;
        }
        
        return (
            <div className = {className}>
                {section}
            </div>
        )
    }
}