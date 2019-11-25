'use strict';

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import UserInfoForm from './forms/userInfoForm';

// Сообщение
export default class Message extends PureComponent {

    constructor(props) {
        super(props);

        this.showUserInfo = this.showUserInfo.bind(this);
    }

    showUserInfo(event) {
        debugger;
        event.preventDefault();

        if (this.props.message.senderId) {
            this.props.showUserInfoById(this.props.message.senderId);
        }
    }

    render() {
        //console.log('render message');
        const className = 'message ' + (this.props.className ? this.props.className : '');

        debugger;
        const date = this.props.message.date;
        let dateString;

        if (date) {
            dateString = (typeof(date) === "string") ? new Date(date).toLocaleTimeString() : date.toLocaleTimeString();
        }

        let userInfoBlock;

        //resetUserInfo = {this.props.resetUserInfo}
        if (this.props.userInfo) {
            userInfoBlock = <UserInfoForm
                                userInfo = {this.props.userInfo}
                                resetUserInfo = {this.props.resetUserInfo}
                            />;
        }
        else if (this.props.message.senderId) {
            userInfoBlock = <Link to="/" onClick = {this.showUserInfo}>Sender</Link> 
        }
        else {
            userInfoBlock = 'Sender';  //todo?
        }
        
        return (
            <div className = {className}>
                <div>MESSAGE</div>
                
                <div>{userInfoBlock}</div>

                <div>{dateString}</div>
                <div>{this.props.message.text}</div>
            </div>
        )
    }
}
