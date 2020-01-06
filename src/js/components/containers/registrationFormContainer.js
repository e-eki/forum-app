'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import RegistrationForm from '../views/forms/registrationForm';
import { registration } from '../../api/authApi';
import { setAlertData } from '../../actions/alertDataActions';

class RegistrationFormContainer extends PureComponent {

    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <RegistrationForm
                setAlertData = {this.props.setAlertData}
                registration = {registration}

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

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationFormContainer);