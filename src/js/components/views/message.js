'use strict';

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import forumConst from '../../constants/forumConst';
import appConst from '../../constants/appConst';
import { getDateTimeString } from '../../utils/dateStringUtils';

// Сообщение
export default class Message extends PureComponent {

    constructor(props) {
        super(props);

        this.showUserInfo = this.showUserInfo.bind(this);
        this.showInfo = this.showInfo.bind(this);
    }

    showInfo() {
        debugger;
        this.props.setCurrentInfoMessage(this.props.message);
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
        let messageNameBlock = <div>MESSAGE</div>;

        if (this.props.type === forumConst.itemTypes.searchMessage && this.props.message.channelId) {
            messageNameBlock = <Link to={`${appConst.channelsLink}/${this.props.message.channelId}`}>
                                <div>MESSAGE</div>
                            </Link>;
        }

        const dateString = getDateTimeString(this.props.message.date);

        const senderName = this.props.message.senderName || 'NoName';
        const userInfoBlock = <Link to="/" onClick = {this.showUserInfo}>{senderName}</Link> 

        let messageInfoBlock = null;

        if (!this.props.isCurrent) {
            messageInfoBlock = <button className = '' onClick = {this.showInfo}>
                                    Информация
                                </button>;
        }
        
        return (
            <div className = {className}>
                {messageNameBlock}
                
                <div>{userInfoBlock}</div>

                <div>{dateString}</div>
                <div>{this.props.message.text}</div>

                {messageInfoBlock}
            </div>
        )
    }
}
