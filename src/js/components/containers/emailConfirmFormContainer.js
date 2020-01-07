'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import EmailConfirmForm from '../views/forms/emailConfirmForm';
import { emailConfirm } from '../../api/authApi';
import { setAlertData } from '../../actions/alertDataActions';
import appConst from '../../constants/appConst';
import * as baseUtils from '../../utils/baseUtils';

class EmailConfirmFormContainer extends PureComponent {

    constructor(props) {
        super(props);

        this.doEmailConfirm = this.doEmailConfirm.bind(this);
    }

    doEmailConfirm(email) {
        debugger;

        return emailConfirm(email)
			.then(response => {
                debugger; 

                const alertData = {
                    message: 'Письмо с кодом подтверждения отправлено на указанный адрес электронной почты.',   //?
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
            <EmailConfirmForm
                setAlertData = {this.props.setAlertData}
                doEmailConfirm = {this.doEmailConfirm}

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

export default connect(mapStateToProps, mapDispatchToProps)(EmailConfirmFormContainer);