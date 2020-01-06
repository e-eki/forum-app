'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import LoginForm from '../views/forms/loginForm';
import { login, socialLogin } from '../../api/authApi';
import { setAlertData } from '../../actions/alertDataActions';

class LoginFormContainer extends PureComponent {

    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <LoginForm
                setAlertData = {this.props.setAlertData}
                login = {login}
                socialLogin = {socialLogin}

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
        resetAlertData: function() {
            dispatch(setAlertData(null));
        },
        setAlertData: function(data) {
            dispatch(setAlertData(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer);