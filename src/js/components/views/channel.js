'use strict';

import React, { Component } from 'react';
import Message from './message';

// Канал
export default class Channel extends Component {

    render() {
        console.log('render channel');
        const className = 'channel ' + (this.props.className ? this.props.className : '');

        const messages = [];

        debugger;
        let key = 0;

        if (this.props.data) {
            this.props.data.messages.forEach(function(item) {
                const message = <Message
                                    key={key}
                                    data = {item}
                                />;
                messages.push(message);
                key++;
            });
        }
        
        return (
            <div className = {className}>
                <div>{this.props.data.name}</div>
                <div>{this.props.data.description}</div>

                {messages}
            </div>
        )
    }
}