'use strict';

import React, { PureComponent } from 'react';
import Channel from './channel';

// Подраздел
export default class SubSection extends PureComponent {

    render() {
        console.log('render subSection');
        const className = 'sub-section ' + (this.props.className ? this.props.className : '');

        const channels = [];

        //debugger;
        let key = 0;

        if (this.props.data) {
            this.props.data.channels.forEach(function(item) {
                const channel = <Channel
                                    key={key}
                                    data = {item}
                                />;
                channels.push(channel);
                key++;
            });
        }
        
        return (
            <div className = {className}>
                <div>{this.props.data.name}</div>
                <div>{this.props.data.description}</div>

                {channels}
            </div>
        )
    }
}