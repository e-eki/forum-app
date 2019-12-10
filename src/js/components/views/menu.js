'use strict';

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import appConst from '../../constants/appConst';
import NewMessagesNotificationForm from './forms/newMessagesNotificationForm';

export default class Menu extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        //console.log('render menu');
        debugger;
        const className = 'menu ' + (this.props.className ? this.props.className : '');

        let newMessagesNotificationBlock = null;

        if (this.props.newPrivateMessagesCount) {
            newMessagesNotificationBlock = <NewMessagesNotificationForm
                                                newMessagesCount = {this.props.newPrivateMessagesCount}
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
                    <div>Личные сообщения {newMessagesNotificationBlock}</div>
                </Link>
                -----
            </div>
        )
    }
}