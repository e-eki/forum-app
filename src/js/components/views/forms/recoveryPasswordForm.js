'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import appConst from '../../../constants/appConst';
import authConst from '../../../constants/authConst';
import * as authUtils from '../../../utils/authUtils';

// форма восстановления пароля
export default class RecoveryPasswordForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // имейл
            email: authConst.defaultAuthData.email,
        }

        this.changeData = this.changeData.bind(this);
        this.clearData = this.clearData.bind(this);
        this.clickRecoveryPasswordButton = this.clickRecoveryPasswordButton.bind(this);
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

    // отправить письмо с инструкциями по восстановлению пароля
    clickRecoveryPasswordButton(event) {
        debugger;

        if (!this.state.email ||
            (this.state.email === authConst.defaultAuthData.email) ||
            (this.state.email === authConst.warningAuthData.email)  ||
            !authUtils.isEmailValid(this.state.email)) {
                this.setState({
                    email: authConst.warningAuthData.email,
                });

                return true;
        }
        else {
            return this.props.doRecoveryPassword(this.state.email);
        }
	}
   
    render() {
        const className = 'recovery-form ' + (this.props.className ? this.props.className : '');

        debugger;
        let recoveryPasswordContent = <div></div>;

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
            recoveryPasswordContent = <div className = 'content__auth-utils-form auth-form'>				
                                            <div className = 'auth-utils-form_title'>Восстановление пароля</div>

                                            <input 
                                                name = "email"
                                                type = "text" 
                                                className = 'auth-utils-form_input' 
                                                maxLength = '40'
                                                value = {this.state.email}
                                                onChange = {this.changeData}
                                                onClick = {this.clearData}
                                            />

                                            <button className = 'button button_send auth-utils-form__button' onClick = {this.clickRecoveryPasswordButton}>Отправить</button>
                                            
                                            <Link className = 'auth-utils-form_link' to={appConst.loginLink}>
                                                На страницу входа	
                                            </Link>

                                        </div>;
        }

        return (
            <div className = {className}>
                {recoveryPasswordContent}
            </div> 
        )
    }
}
