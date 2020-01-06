'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import LoginForm from '../views/forms/loginForm';
import * as authApi from '../../api/authApi';

class AuthFormContainer extends PureComponent {

    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <LoginForm
                //todo: loginApi
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        alertData: store.alertDataState.get('alertData'),
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        resetAlertData: function() {
            dispatch(setAlertData(null));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertFormContainer);