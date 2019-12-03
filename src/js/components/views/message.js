'use strict';

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import forumConst from '../../constants/forumConst';
import appConst from '../../constants/appConst';

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
        let headerBlock = <div>MESSAGE</div>;

        if (this.props.type === forumConst.itemTypes.searchMessage && this.props.message.channelId) {
            headerBlock = <Link to={`${appConst.channelsLink}/${this.props.message.channelId}`}>
                                <div>MESSAGE</div>
                            </Link>;
        }

        const date = this.props.message.date;
        let dateString;

        if (date) {
            dateString = (typeof(date) === "string") ? new Date(date).toLocaleTimeString() : date.toLocaleTimeString();
        }

        let userInfoBlock;

        if (this.props.message.senderId) {
            userInfoBlock = <Link to="/" onClick = {this.showUserInfo}>Sender</Link> 
        }
        else {
            userInfoBlock = 'Sender';
        }
        
        return (
            <div className = {className}>
                {headerBlock}
                
                <div>{userInfoBlock}</div>

                <div>{dateString}</div>
                <div>{this.props.message.text}</div>
            </div>
        )
    }
}
