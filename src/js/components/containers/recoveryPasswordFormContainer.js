'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import RecoveryPasswordForm from '../views/forms/recoveryPasswordForm';
import { recoveryPassword } from '../../api/authApi';
import { setAlertData } from '../../actions/alertDataActions';
import appConst from '../../constants/appConst';
import * as baseUtils from '../../utils/baseUtils';

class RecoveryPasswordFormContainer extends PureComponent {

    constructor(props) {
        super(props);

        this.doRecoveryPassword = this.doRecoveryPassword.bind(this);
    }

    doRecoveryPassword(email) {
        return recoveryPassword(email)
			.then(response => {
                const alertData = {
                    message: 'Инструкции по восстановлению пароля отправлены на указанный адрес электронной почты.',   //?
                    secondaryMessage: 'На главную',
                    secondaryLink: appConst.defaultLink,
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
            <RecoveryPasswordForm
                setAlertData = {this.props.setAlertData}
                doRecoveryPassword = {this.doRecoveryPassword}

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

export default connect(mapStateToProps, mapDispatchToProps)(RecoveryPasswordFormContainer);