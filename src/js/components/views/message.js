'use strict';

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import forumConst from '../../constants/forumConst';
import appConst from '../../constants/appConst';
import { getDateTimeString } from '../../utils/dateStringUtils';

// сообщение
export default class Message extends PureComponent {

    constructor(props) {
        super(props);

        this.showUserInfo = this.showUserInfo.bind(this);
        this.showInfo = this.showInfo.bind(this);
    }

    // показать информацию и элементы управления сообщением
    showInfo() {
        this.props.setCurrentInfoMessage(this.props.message);
    }

    // показать информацию юзера - отправителя сообщения
    showUserInfo(event) {
        event.preventDefault();

        if (this.props.message.senderId) {
            this.props.showUserInfoById(this.props.message.senderId);
        }
    }

    render() {
        const className = 'message forum-item ' + (this.props.className ? this.props.className : '');

        debugger;

        const dateString = this.props.message.date ? getDateTimeString(this.props.message.date) : null;

        const senderName = this.props.message.senderName || 'NoName';
        const userInfoBlock = <div className = 'message__user-info'>
                                    <img
                                        className = 'user-info__avatar' 
                                        src = '/images/avatar.jpg' 
                                        alt = {senderName} 
                                        title = {senderName}
                                    >
                                    </img>

                                    <div className = 'user-info__login'>
                                        <Link to="/" onClick = {this.showUserInfo}>
                                            {senderName}
                                        </Link>
                                    </div>
                                </div>;
                            

        let messageInfoBlock = null;

        if (!this.props.isCurrent &&
            (this.props.message && (this.props.message.canEdit || this.props.message.canDelete))) {
                messageInfoBlock = <button className = '' onClick = {this.showInfo}>
                                        Информация
                                    </button>;
        }
        
        return (
            <div>
                <div className = {className}>      
                    <div>{userInfoBlock}</div>

                    <div className = 'message__text'>
                        {this.props.message.text}
                    </div>

                    <div className = 'message__date'>
                        {dateString}
                    </div>
                </div>

                {messageInfoBlock}
            </div>
        )
    }
}
