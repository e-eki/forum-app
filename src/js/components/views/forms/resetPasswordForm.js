'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import appConst from '../../../constants/appConst';
import authConst from '../../../constants/authConst';

// Форма сброса пароля
export default class ResetPasswordForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            password: authConst.defaultAuthData.password,
            duplicatePassword: authConst.defaultAuthData.duplicatePassword,
        }

        this.changeData = this.changeData.bind(this);
        this.clearData = this.clearData.bind(this);
        this.clickResetPasswordButton = this.clickResetPasswordButton.bind(this);
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
	clearData(event) {   //todo: check!
		const name = event.target.name;

		this.setState({
            [name]: '',
        });
    }

    clickResetPasswordButton(event) {
        debugger;
        let isDataValid = true;

        if (!this.state.password ||
            (this.state.password === authConst.defaultAuthData.password) ||
            (this.state.password === authConst.warningAuthData.password)) {
                this.state.password = authConst.warningAuthData.password;
                isDataValid = false;
        }

        if (!this.state.duplicatePassword ||
            (this.state.duplicatePassword === authConst.defaultAuthData.duplicatePassword) ||
			(this.state.duplicatePassword === authConst.warningAuthData.duplicatePassword) || 
			(this.state.duplicatePassword !== this.state.password)) {
				this.state.duplicatePassword = authConst.warningAuthData.duplicatePassword;
                isDataValid = false;
        }
        
        if (!isDataValid) {
            this.setState({});
            return true;
        }
        else {
            return this.props.doResetPassword(this.state.password);
        }
	}
   
    render() {
        const className = 'reset-form ' + (this.props.className ? this.props.className : '');

        debugger;

        return (
            <div className = {className}>
               <div className = 'content__auth-utils-form auth-utils-form'>				
                    <div className = 'auth-utils-form_title'>Восстановление пароля</div>
                    
                    <input 
                        name = "password"
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

                    <button className = 'button button_send auth-utils-form__button' onClick = {this.clickResetPasswordButton}>Отправить</button>
                    
                    <Link className = 'auth-utils-form_link' to={appConst.loginLink}>
                        На страницу входа	
                    </Link>

                </div>
            </div> 
        )
    }
}
