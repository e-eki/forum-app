'use strict';

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import appConst from '../../constants/appConst';
import NotificationForm from './forms/notificationForm';

export default class Menu extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        //console.log('render menu');
        debugger;
        const className = 'menu ' + (this.props.className ? this.props.className : '');

        let notificationBlock = null;
        const newMessagesCount = this.props.newMessagesCount ? this.props.newMessagesCount : null;

        if (newMessagesCount) {
            const notificationText = `+ ${newMessagesCount} новых`;

            notificationBlock = <NotificationForm
                                    notificationText = {notificationText}
                                />;
        }
        
        return (
            <div className = {className}>
                -----
                <div>Menu</div>

                <Link to={`${appConst.defaultLink}`}>
                    <div>Главная</div>
                </Link>

                {/* <Link to={`${appConst.userInfoLink}`}>
                    <div>Профиль</div>
                </Link> */}

                <Link to={`${appConst.privateChannelsLink}`}>
                    <div>Личные сообщения {notificationBlock}</div>
                </Link>
                -----
            </div>
        )
    }
}