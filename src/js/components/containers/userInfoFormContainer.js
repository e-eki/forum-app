'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import UserInfoForm from '../views/forms/userInfoForm';
import { setCurrentUserInfo } from '../../actions/userInfoActions';

class UserInfoFormContainer extends PureComponent {

    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <UserInfoForm
                userInfo = {this.props.currentUserInfo}
                resetCurrentUserInfo = {this.props.resetCurrentUserInfo}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        currentUserInfo: store.userInfo.get('currentUserInfo'),
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        resetCurrentUserInfo: function() {
            dispatch(setCurrentUserInfo(null));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoFormContainer);