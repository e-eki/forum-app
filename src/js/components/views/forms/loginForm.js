'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import appConst from '../../../constants/appConst';
import authConst from '../../../constants/authConst';
import * as authUtils from '../../../utils/authUtils';

// Форма для входа на сайт
export default class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.titles = {
			vkTitle: 'Войти с помощью Вконтакте',
			googleTitle: 'Войти с помощью Google',
		};

        this.state = {
            login: '',
            password: '',
        }

        this.changeData = this.changeData.bind(this);
        this.clearData = this.clearData.bind(this);
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
		const dataName = event.target.name;

		this.state[`${dataName}Data`] = '';
		this.setState({});
    }





    clickLoginButton(event) {
        debugger;
        let isLoginDataValid = true;

        if (!this.state.login ||
            (this.state.login === authConst.warningData.login)) {
                this.state.login = authConst.warningData.login;
                isLoginDataValid = false;
        }

        if (!this.state.email ||
            (this.state.email === authConst.warningData.email) ||
            !authUtils.isEmailValid) {
                this.state.email = authConst.warningData.email;
                isLoginDataValid = false;
        }

        if (!isLoginDataValid) {
            this.setState({});
        }

		return authActions.loginAction(this.state.emailData, this.state.passwordData)
			.then((response) => {
				this.state.messageLink = '/';
				this.state.messageLinkName = 'На главную';
				
				response.data = 'Вы успешно вошли на сайт. Нажмите ссылку для перехода.';
				this.responseHandle(response);
			})
			.catch((error) => {
				if (error.response && error.response.status && error.response.status === 401) {
					this.state.messageLink = '/registration';  //todo: ??
					this.state.messageLinkName = 'Зарегистрироваться';

					error.response.data.message = 'Пользователь с указанным имейлом не найден.';
				}
				this.errorResponseHandle(error);
			})
	}
    
    clickSocialLoginButton(event) {
		debugger;
		const service = event.target.name;

		// TODO!!! vkontakte api не отвечает localhost (нет 'Access-Control-Allow-Origin' в заголовке)
		return authActions.socialLoginAction(service)
			.then((response) => {
				this.state.messageLink = '/';
				this.state.messageLinkName = 'На главную';

				response.data = 'Вы успешно вошли на сайт. Нажмите ссылку для перехода.';
				this.responseHandle(response);
			})
			.catch((error) => {
				this.errorResponseHandle(error);
			})
	}

    render() {
        //console.log('render loginForm');
        const className = 'login-form ' + (this.props.className ? this.props.className : '');

        debugger;

        return (
            <div className = {className}>
                <div className = 'content__auth-utils-form auth-utils-form'>

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

                </div>
            </div>
        )
    }
}
