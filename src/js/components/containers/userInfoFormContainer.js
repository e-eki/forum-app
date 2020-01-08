'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import UserInfoForm from '../views/forms/userInfoForm';
import { setCurrentUserInfo, setModifiableUserInfo } from '../../actions/userInfoActions';
import { modifyUserInfo } from '../../api/userInfoApi';

class UserInfoFormContainer extends PureComponent {

    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <UserInfoForm
                userInfo = {this.props.currentUserInfo}
                modifiableUserInfo = {this.props.modifiableUserInfo}
                resetCurrentUserInfo = {this.props.resetCurrentUserInfo}
                setModifiableUserInfo = {this.props.setModifiableUserInfo}
                modifyUserInfo = {modifyUserInfo}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        currentUserInfo: store.userInfoState.get('currentUserInfo'),
        modifiableUserInfo: store.userInfoState.get('modifiableUserInfo'),
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        resetCurrentUserInfo: function() {
            dispatch(setCurrentUserInfo(null));
        },
        setModifiableUserInfo: function(item) {
            dispatch(setModifiableUserInfo(item));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoFormContainer);