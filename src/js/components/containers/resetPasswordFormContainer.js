'use strict';

import Promise from 'bluebird';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ResetPasswordForm from '../views/forms/resetPasswordForm';
import { resetPassword } from '../../api/authApi';
import { setAlertData } from '../../actions/alertDataActions';
import appConst from '../../constants/appConst';
import { getActualAccessToken } from '../../api/authApi';
import * as baseUtils from '../../utils/baseUtils';

class ResetPasswordFormContainer extends PureComponent {

    constructor(props) {
        super(props);

        this.doResetPassword = this.doResetPassword.bind(this);
    }

    doResetPassword(password) {
        debugger;

        return Promise.resolve(true)
			.then(() => {
                debugger;
				// если на форму попали по ссылке из письма, то аксесс токен должен быть в параметрах
				if (this.props.match && this.props.match.params && this.props.match.params.id) {					
					return this.props.match.params.id;   //TODO!!! check
				}
				// если из личного кабинета
				else {
					return getActualAccessToken();
				}
			})
			.then(accessToken => {
                debugger;
				return resetPassword(accessToken, password);
            })
            .then(response => {
                debugger;
                const alertData = {
                    message: 'Пароль успешно изменен.',   //?
                    secondaryMessage: 'На страницу входа',
                    secondaryLink: appConst.loginLink,
                };

                this.props.setAlertData(alertData);
			})
			.catch(error => {
                baseUtils.showErrorMessage(error);
                return false;
            })
    }
    
    render() {
        debugger;
        
        return (
            <ResetPasswordForm
                setAlertData = {this.props.setAlertData}
                doResetPassword = {this.doResetPassword}

                // accessToken = {this.props.accessToken}
                // refreshToken = {this.props.refreshToken}
                // accessTokenExpiresIn = {this.props.accessTokenExpiresIn}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        // accessToken: store.authState.get('accessToken'),
        // refreshToken: store.authState.get('refreshToken'),
        // accessTokenExpiresIn: store.authState.get('accessTokenExpiresIn'),
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        setAlertData: function(data) {
            dispatch(setAlertData(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordFormContainer);