'use strict';

import React, { PureComponent } from 'react';

// Сообщение
export default class Message extends PureComponent {

    render() {
        console.log('render message');
        const className = 'message ' + (this.props.className ? this.props.className : '');
        
        return (
            <div className = {className}>
                <div>sender</div>
                <div>{this.props.data.date.toLocaleTimeString()}</div>
                <div>{this.props.data.text}</div>
            </div>
        )
    }
}