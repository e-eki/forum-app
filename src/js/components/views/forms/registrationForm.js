'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import appConst from '../../../constants/appConst';
import authConst from '../../../constants/authConst';
import * as authUtils from '../../../utils/authUtils';

// Форма для регистрации на сайте
export default class RegistrationForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            login: '',
            email: '',
            password: '',
        }

        this.changeData = this.changeData.bind(this);
        this.clearData = this.clearData.bind(this);
        this.clickRegistrationButton = this.clickRegistrationButton.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true; //todo??
    }

    // ввод данных
	changeData(event) {
        debugger;
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    // по клику на инпуте он очищается
	clearData(event) {   //todo: check!
        debugger;
		const name = event.target.name;

		this.setState({
            [name]: '',
        });
    }

    clickRegistrationButton(event) {
        debugger;
        let isDataValid = true;

        if (!this.state.login ||
            (this.state.login === authConst.warningData.login)) {
                this.state.login = authConst.warningData.login;
                isDataValid = false;
        }

        if (!this.state.email ||
            (this.state.email === authConst.warningData.email  ||
            !authUtils.isEmailValid)) {
                this.state.email = authConst.warningData.email;
                isDataValid = false;
        }

        if (!this.state.password ||
            (this.state.password === authConst.warningData.password)) {
                this.state.password = authConst.warningData.password;
                isDataValid = false;
        }

        if (!isDataValid) {
            this.setState({});

            return true;
        }

		return this.props.registration(this.state.email, this.state.login, this.state.password)
			.then(response => {
                const alertData = {
                    message: 'Письмо с кодом подтверждения было отправлено на указанный имейл.',   //?
                    secondaryMessage: 'На главную',
                    secondaryLink: appConst.defaultLink,
                };

                this.props.setAlertData(alertData);
			})
			.catch(error => {
                const message = authUtils.getErrorResponseMessage(error);  //?

                const alertData = {
                    message: message,
                    
                };

				this.props.setAlertData(alertData);
			})
	}
    
    clickSocialLoginButton(event) {
		debugger;
		const service = event.target.name;

		// TODO!!! vkontakte api не отвечает localhost (нет 'Access-Control-Allow-Origin' в заголовке)
		return this.props.socialLogin(service)
            .then(response => {
                const alertData = {
                    message: 'Вы успешно вошли на сайт. Нажмите ссылку для перехода.',
                    secondaryMessage: 'На главную',
                    secondaryLink: appConst.defaultLink,
                };

                this.props.setAlertData(alertData);
            })
            .catch(error => {
                const message = authUtils.getErrorResponseMessage(error);  //?

                const alertData = {
                    message: message,
                };

                this.props.setAlertData(alertData);
            })
	}

    render() {
        //console.log('render loginForm');
        const className = 'login-form ' + (this.props.className ? this.props.className : '');

        debugger;

        let loginBlock = <div></div>;

        if (this.props.accessToken &&
            this.props.refreshToken &&
            this.props.accessTokenExpiresIn) {
                const alertData = {
                    message: 'Вы успешно вошли на сайт. Нажмите ссылку для перехода.',
                    link: appConst.defaultLink,
                };

                this.props.setAlertData(alertData);
        }
        else {
            loginBlock = <div className = 'content__auth-utils-form auth-utils-form'>

                            <div className = 'auth-utils-form_title'>Вход</div>

                            <div className = 'auth-utils-form_social'>

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
                                className = 'auth-utils-form_input' 
                                maxLength = '40'
                                value = {this.state.email}
                                onChange = {this.changeData}
                                onClick = {this.clearData}
                            />
                            
                            <input 
                                name = 'password'
                                type = "text" 
                                className = 'auth-utils-form_input' 
                                maxLength = '40'
                                value = {this.state.password}
                                onChange = {this.changeData}
                                onClick = {this.clearData}
                            />

                            <button className = 'button button_login auth-utils-form__button' onClick = {this.clickLoginButton}>Войти</button>

                            <div className = 'auth-utils-form_text'>или</div>

                            <Link to = {appConst.registrationLink}>
                                <button className = 'button button_reg auth-utils-form__button'>Зарегистрироваться</button>
                            </Link>

                            <Link className = 'auth-utils-form_link' to = {appConst.recoveryPasswordLink}>
                                Забыли пароль?	
                            </Link>

                            <Link className = 'auth-utils-form_link' to = {appConst.emailConfirmLink}>
                                Не пришло письмо?	
                            </Link>

                            <Link className = 'auth-utils-form_link' to = {appConst.defaultLink}>
                                На главную	
                            </Link>

                        </div>;
        }

        return (
            <div className = {className}>
                {loginBlock}
            </div>
        )
    }
}
