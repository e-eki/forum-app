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
            duplicatePassword: '',
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

        if (!this.state.duplicatePassword ||
			(this.state.duplicatePassword === authConst.warningData.duplicatePassword) || 
			(this.state.duplicatePassword !== this.state.password)) {
				this.state.duplicatePassword = authConst.warningData.duplicatePassword;
                isDataValid = false;
		}

        if (!isDataValid) {
            this.setState({});
            return true;
        }
        else {
            return this.props.doRegistration(this.state.email, this.state.login, this.state.password);
        }
	}
   
    render() {
        //console.log('render registrationForm');
        const className = 'registration-form ' + (this.props.className ? this.props.className : '');

        debugger;

        let registrationBlock = <div></div>;

        if (this.props.accessToken &&
            this.props.refreshToken &&
            this.props.accessTokenExpiresIn) {
                const alertData = {
                    message: 'Вы успешно вошли на сайт. Нажмите ссылку для перехода.',
                    secondaryMessage: 'На главную',
                    secondaryLink: appConst.defaultLink,
                };

                this.props.setAlertData(alertData);
        }
        else {
            registrationBlock = <div className = 'content__auth-utils-form auth-utils-form'>

                                    <div className = 'auth-utils-form_title'>Регистрация</div>

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
                                        name = "login"
                                        type="text" 
                                        className = 'auth-utils-form_input' 
                                        maxLength = '40'
                                        value = {this.state.login}
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

                                    <input 
                                        name = "duplicatePassword"
                                        type = "text" 
                                        className = 'auth-utils-form_input' 
                                        maxLength = '40'
                                        value = {this.state.duplicatePassword}
                                        onChange = {this.changeData}
                                        onClick = {this.clearData}
                                    />

                                    <button className = 'button button_reg auth-utils-form__button' onClick = {this.clickRegistrationButton}>Зарегистрироваться</button>

                                    <Link className = 'auth-utils-form_link' to={appConst.recoveryPasswordLink}>
                                        Забыли пароль?	
                                    </Link>

                                    <Link className = 'auth-utils-form_link' to={appConst.emailConfirmLink}>
                                        Не пришло письмо?	
                                    </Link>

                                    <Link className = 'auth-utils-form_link' to={appConst.defaultLink}>
                                        На главную	
                                    </Link>

                                </div>;
        }

        return (
            <div className = {className}>
                {registrationBlock}
            </div>
        )
    }
}
