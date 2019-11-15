'use strict';

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

// Сообщение
export default class Message extends PureComponent {

    constructor(props) {
        super(props);

        this.getUserInfo = this.getUserInfo.bind(this);
    }

    getUserInfo(event) {
        debugger;
        event.preventDefault();
        //this.props.getUserInfo(this.props.data.senderId);
    }

    render() {
        //console.log('render message');
        const className = 'message ' + (this.props.className ? this.props.className : '');
        
        return (
            <div className = {className}>
                <Link to="/" onClick = {this.getUserInfo}>Sender</Link> 

                <div>{this.props.data.date.toLocaleTimeString()}</div>
                <div>{this.props.data.text}</div>
            </div>
        )
    }
}
