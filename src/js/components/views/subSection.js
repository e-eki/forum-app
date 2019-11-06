'use strict';

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Channel from './channel';

// Подраздел
export default class SubSection extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        console.log('render subSection');
        const className = 'sub-section ' + (this.props.className ? this.props.className : '');

        let subSection = <div></div>;
        const channels = [];
        let key = 0;

        if (this.props.subSection) {

            if (this.props.isCurrent && this.props.subSection.channels) {
                this.props.subSection.channels.forEach(function(item) {
                    const channel = <Channel
                                        key={key}
                                        channel = {item}
                                    />;
                    channels.push(channel);
                    key++;
                }.bind(this));
            }

            subSection = <div>
                            {this.props.isCurrent
                                ?
                                this.props.subSection.name
                                :
                                <Link to={`/subsections/${this.props.subSection.id}`}>{this.props.subSection.name}</Link> 
                            }
                            <div>{this.props.subSection.description}</div>
                            {channels}
                        </div>;
        }
        
        return (
            <div className = {className}>
                {subSection}
            </div>
        )
    }
}