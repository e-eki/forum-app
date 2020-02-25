'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import appConst from '../../../constants/appConst';
import authConst from '../../../constants/authConst';
import * as authUtils from '../../../utils/authUtils';

// форма для входа на сайт
export default class LoginForm extends Component {

    constructor(props) {
        super(props);

        // названия кнопок для входа через соцсети
        this.titles = {
			vkTitle: 'Войти с помощью Вконтакте',
			googleTitle: 'Войти с помощью Google',
		};

        this.state = {
            // имейл
            email: authConst.defaultAuthData.email,
            // пароль
            password: authConst.defaultAuthData.password,
        }

        this.changeData = this.changeData.bind(this);
        this.clearData = this.clearData.bind(this);
        this.clickLoginButton = this.clickLoginButton.bind(this);
        this.clickSocialLoginButton = this.clickSocialLoginButton.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true; //todo??
    }

    // ввод данных
	changeData(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    // по клику на инпуте он очищается
	clearData(event) {
		const name = event.target.name;

		this.setState({
            [name]: '',
        });
    }

    // обработчик лика по кнопке входа
    clickLoginButton(event) {
        let isDataValid = true;

        if (!this.state.email ||
            (this.state.email === authConst.defaultAuthData.email) ||
            (this.state.email === authConst.warningAuthData.email  ||
            !authUtils.isEmailValid(this.state.email))) {
                this.state.email = authConst.warningAuthData.email;
                isDataValid = false;
        }

        if (!this.state.password ||
            (this.state.password === authConst.defaultAuthData.password) ||
            (this.state.password === authConst.warningAuthData.password)) {
                this.state.password = authConst.warningAuthData.password;
                isDataValid = false;
        }

        if (!isDataValid) {
            this.setState({});

            return true;
        }
        else {
            return this.props.doLogin(this.state.email, this.state.password);
        }
    }

    // обработчик клика по кнопке входа через соцсеть
    clickSocialLoginButton(event) {
        debugger;
        const service = event.target.name;

        return this.props.doSocialLogin(service);
    }

    render() {
        const className = (this.props.className ? this.props.className : '');

        debugger;
        let loginContent = <div></div>;

        // если есть аксесс токен, то значит юзер уже залогинился, и не показываем ему форму
        if (this.props.accessToken &&
            //this.props.refreshToken &&
            this.props.accessTokenExpiresIn) {
                const alertData = {
                    message: 'Вы успешно вошли на сайт. Нажмите ссылку для перехода.',
                    secondaryMessage: 'На главную',
                    secondaryLink: appConst.defaultLink,
                };

                this.props.setAlertData(alertData);
        }
        else {
            loginContent = <div className = 'auth-form'>
                                <div className = 'auth-form__title'>Вход</div>

                                <div className = 'auth-form__social-icon'>
                                    <img 
                                        name = "vkontakte"
                                        className = 'social-icon' 
                                        src = '/icons/vkontakte-icon_blue.png' 
                                        alt = {this.titles.vkTitle} 
                                        title = {this.titles.vkTitle}
                                        onClick = {this.clickSocialLoginButton}>
                                    </img>

                                    <img 
                                        name = "google"
                                        className = 'social-icon' 
                                        src = '/icons/google-icon_red.png' 
                                        alt = {this.titles.googleTitle} 
                                        title = {this.titles.googleTitle}
                                        onClick = {this.clickSocialLoginButton}>
                                    </img>
                                </div>

                                <input 
                                    name = "email"
                                    type="text" 
                                    className = '' 
                                    maxLength = '40'
                                    value = {this.state.email}
                                    onChange = {this.changeData}
                                    onClick = {this.clearData}
                                />

                                <input 
                                    name = 'password'
                                    type = "text" 
                                    className = '' 
                                    maxLength = '40'
                                    value = {this.state.password}
                                    onChange = {this.changeData}
                                    onClick = {this.clearData}
                                />

                                <button
                                    className = 'auth-form__button'
                                    onClick = {this.clickLoginButton}
                                >
                                    Войти
                                </button>

                                <div
                                    className = 'auth-form__text'
                                >
                                    или
                                </div>

                                <Link to = {appConst.registrationLink}>
                                    <button className = 'auth-form__button'>Зарегистрироваться</button>
                                </Link>

                                {/* <Link className = 'auth-form__link' to = {appConst.recoveryPasswordLink}>
                                    Забыли пароль?	
                                </Link> */}

                                <Link className = 'auth-form__link' to = {appConst.emailConfirmLink}>
                                    Не пришло письмо?	
                                </Link>

                                <Link className = 'auth-form__link' to = {appConst.defaultLink}>
                                    На главную	
                                </Link>
                            </div>;
        }

        return (
            <div className = {className}>
                {loginContent}
            </div>
        )
    }
}
