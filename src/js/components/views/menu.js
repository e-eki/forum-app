'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import appConst from '../../constants/appConst';
import NewMessagesNotificationForm from './forms/newMessagesNotificationForm';

export default class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isUserAuthenticated: false,
        }

        this.updateUserAuthenticatedFlag = this.updateUserAuthenticatedFlag.bind(this);
    }

    shouldComponentUpdate() {
        return true; //todo
    }

    componentDidMount() {
        debugger;

        return this.updateUserAuthenticatedFlag();
    }

    componentDidUpdate(prevProps) {
        debugger;
        // если изменились данные токенов, проверяем снова, залогинен ли пользователь
        if ((this.props.accessToken !== prevProps.accessToken) ||
            (this.props.refreshToken !== prevProps.refreshToken) ||
            (this.props.accessTokenExpiresIn !== prevProps.accessTokenExpiresIn)) {
                return this.updateUserAuthenticatedFlag();
            }
    }

    updateUserAuthenticatedFlag() {
        return this.props.getUserAuthenticatedFlag()
            .then(isUserAuthenticated => {
                debugger;

                this.setState({
                    isUserAuthenticated: isUserAuthenticated,
                })
                
                return true;
            })
    }

    render() {
        //console.log('render menu');
        debugger;
        const className = 'menu ' + (this.props.className ? this.props.className : '');

        let authContent;

        if (this.state.isUserAuthenticated) {

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
                -----
                <div>Menu</div>

                <Link to={appConst.defaultLink}>
                    <div>Главная</div>
                </Link>

                {authContent}
                -----
            </div>
        )
    }
}