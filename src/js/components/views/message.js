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
        //this.props.getUserInfo(this.props.message.senderId);
    }

    render() {
        //console.log('render message');
        const className = 'message ' + (this.props.className ? this.props.className : '');

        debugger;

        //const date = this.props.message.date ? this.props.message.date.toLocaleTimeString() : null;
        
        return (
            <div className = {className}>
                <Link to="/" onClick = {this.getUserInfo}>Sender</Link> 

                {/* <div>{date}</div> */}
                <div>{this.props.message.text}</div>
            </div>
        )
    }
}
