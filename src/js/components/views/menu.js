'use strict';

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import appConst from '../../constants/appConst';
import NewMessagesNotificationForm from './forms/newMessagesNotificationForm';

// меню
export default class Menu extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        debugger;
        const className = 'menu ' + (this.props.className ? this.props.className : '');

        let authContent;

        // если есть аксесс токен и его срок жизни не истек, то есть юзер залогинен
        if (this.props.accessToken &&
            this.props.accessTokenExpiresIn &&
            !this.props.isAccessTokenExpired()) {
                
                const notificationBlock = this.props.newPrivateMessagesCount
                                            ?
                                            <NewMessagesNotificationForm
                                                newMessagesCount = {this.props.newPrivateMessagesCount}
                                            />
                                            :
                                            null;

                authContent = <div>
                                    <button className = '' onClick = {this.props.showUserInfo}>
                                        Личный кабинет
                                    </button>

                                    <Link to={appConst.privateChannelsLink}>
                                        <button className = 'menu__private-channels-button'>
                                            Личные сообщения {notificationBlock}
                                        </button>
                                    </Link>              

                                    <button className = '' onClick = {this.props.doLogout}>
                                        Выйти
                                    </button>
                                </div>;
        }
        // если нет аксесс токена, то есть юзер не залогинен
        else {
            authContent = <div>
                                <Link to={appConst.loginLink}>
                                    <button className = ''>
                                        Вход
                                    </button>
                                </Link>
                                
                                <Link to={appConst.registrationLink}>
                                    <button className = ''>
                                        Регистрация
                                    </button>
                                </Link>
                            </div>;
        }
        
        return (
            <div className = {className}>
                <Link to={appConst.defaultLink}>
                    <button className = ''>
                        Главная
                    </button>
                </Link>

                {authContent}

                <button onClick={this.props.changeColorTheme} className = 'menu__mode-button'>
                    {this.props.colorThemeTitle}
                </button>
            </div>
        )
    }
}