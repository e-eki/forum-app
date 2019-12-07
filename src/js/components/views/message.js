'use strict';

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import forumConst from '../../constants/forumConst';
import appConst from '../../constants/appConst';
import { getDateString } from '../../lib/dateStringUtils';

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

        const dateString = getDateString(this.props.message.date);

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
