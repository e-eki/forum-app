'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import RegistrationForm from '../views/forms/registrationForm';
import { registration } from '../../api/authApi';
import { setAlertData } from '../../actions/alertDataActions';
import appConst from '../../constants/appConst';
import * as baseUtils from '../../utils/baseUtils';

class RegistrationFormContainer extends PureComponent {

    constructor(props) {
        super(props);

        this.doRegistration = this.doRegistration.bind(this);
    }

    doRegistration(email, login, password) {
        debugger;

        return registration(email, login, password)
			.then(response => {
                debugger; 

                const alertData = {
                    message: 'Письмо с кодом подтверждения было отправлено на указанный имейл. Для завершения регистрации перейдите по ссылке из письма.',   //?
                    // secondaryMessage: 'На главную',
                    // secondaryLink: appConst.defaultLink,
                    link: appConst.defaultLink,
                };

                this.props.setAlertData(alertData);
			})
			.catch(error => {
                baseUtils.showErrorMessage(error);
                return false;
            })
    }
    
    render() {
        return (
            <RegistrationForm
                setAlertData = {this.props.setAlertData}
                doRegistration = {this.doRegistration}

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

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationFormContainer);