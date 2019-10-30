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

        if (this.props.data) {

            if (this.props.isCurrent && this.props.data.channels) {
                this.props.data.channels.forEach(function(item) {
                    const channel = <Channel
                                        key={key}
                                        currentChannel = {item}
                                    />;
                    channels.push(channel);
                    key++;
                });
            }

            subSection = <div>
                            {this.props.isCurrent
                                ?
                                this.props.data.name
                                :
                                <Link to={`/subsections/${this.props.data.id}`}>{this.props.data.name}</Link> 
                            }
                            <div>{this.props.data.description}</div>
                            {this.props.isCurrent ? channels : null}
                        </div>;
        }
        
        return (
            <div className = {className}>
                {subSection}
            </div>
        )
    }
}