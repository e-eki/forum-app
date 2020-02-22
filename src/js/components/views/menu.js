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
                                    <button className = 'bar__button button button_lk' onClick = {this.props.showUserInfo}>
                                        Личный кабинет
                                    </button>

                                    <Link to={appConst.privateChannelsLink}>
                                        <button className = 'bar__button button button_lk'>
                                            Личные сообщения {notificationBlock}
                                        </button>
                                    </Link>              

                                    <button className = 'bar__button button button_lk' onClick = {this.props.doLogout}>
                                        Выйти
                                    </button>
                                </div>;
        }
        // если нет аксесс токена, то есть юзер не залогинен
        else {
            authContent = <div>
                                <Link to={appConst.loginLink}>
                                    <button className = 'bar__button button button_login'>
                                        Вход
                                    </button>
                                </Link>
                                
                                <Link to={appConst.registrationLink}>
                                    <button className = 'bar__button button button_reg'>
                                        Регистрация
                                    </button>
                                </Link>
                            </div>;
        }
        
        return (
            <div className = {className}>
                <Link to={appConst.defaultLink}>
                    <div>Главная</div>
                </Link>

                <button onClick={this.props.changeColorTheme} className = 'button'>
                    {this.props.colorThemeTitle}
                </button>

                {authContent}
            </div>
        )
    }
}