'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import LoginForm from '../views/forms/loginForm';
import { login, socialLogin } from '../../api/authApi';
import { setAlertData } from '../../actions/alertDataActions';
import * as baseUtils from '../../utils/baseUtils';
import appConst from '../../constants/appConst';

class LoginFormContainer extends PureComponent {

    constructor(props) {
        super(props);

        this.clickLoginButton = this.clickLoginButton.bind(this);
        this.clickSocialLoginButton = this.clickSocialLoginButton.bind(this);
    }

    clickLoginButton(email, password) {
        debugger;

		return login(email, password)
			.then(response => {
                const alertData = {
                    message: 'Вы успешно вошли на сайт. Нажмите ссылку для перехода.',
                    secondaryMessage: 'На главную',
                    secondaryLink: appConst.defaultLink,
                };

                this.props.setAlertData(alertData);
			})
			.catch(error => {
                let alertData;

                if (error.response && error.response.status && error.response.status === 401) {
                    alertData = {
                        message: 'Пользователь с указанным имейлом не найден.',
                        secondaryMessage: 'Зарегистрироваться',
                        secondaryLink: appConst.registrationLink,
                    };
                }
                else {
                    const message = baseUtils.getErrorResponseMessage(error);  //?

                    alertData = {
                        message: message,
                    };
                }

				this.props.setAlertData(alertData);
			})
	}
    
    clickSocialLoginButton(service) {
		debugger;

		// TODO!!! vkontakte api не отвечает localhost (нет 'Access-Control-Allow-Origin' в заголовке)
		return socialLogin(service)
            .then(response => {
                const alertData = {
                    message: 'Вы успешно вошли на сайт. Нажмите ссылку для перехода.',
                    secondaryMessage: 'На главную',
                    secondaryLink: appConst.defaultLink,
                };

                this.props.setAlertData(alertData);
            })
            .catch(error => {
                const message = baseUtils.getErrorResponseMessage(error);  //?

                const alertData = {
                    message: message,
                };

                this.props.setAlertData(alertData);
            })
	}
    
    render() {
        return (
            <LoginForm
                doLogin = {this.doLogin}
                doSocialLogin = {this.doSocialLogin}
                setAlertData = {this.props.setAlertData}

                accessToken = {this.props.accessToken}
                refreshToken = {this.props.refreshToken}
                accessTokenExpiresIn = {this.props.accessTokenExpiresIn}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        accessToken: store.authState.get('accessToken'),
        refreshToken: store.authState.get('refreshToken'),
        accessTokenExpiresIn: store.authState.get('accessTokenExpiresIn'),
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        setAlertData: function(data) {
            dispatch(setAlertData(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer);