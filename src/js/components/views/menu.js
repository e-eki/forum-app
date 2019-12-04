'use strict';

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import appConst from '../../constants/appConst';

export default class Menu extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        //console.log('render menu');
        const className = 'menu ' + (this.props.className ? this.props.className : '');

        const newMessagesCount = (this.props.newMessages && this.props.newMessages.count) ? this.props.newMessages.count : null;

        const newMessagesNotification = newMessagesCount ? `+ ${newMessagesCount} новых` : '';
        
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
                    <div>Личные сообщения {newMessagesNotification}</div>
                </Link>
                -----
            </div>
        )
    }
}