'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import UserInfoForm from '../views/forms/userInfoForm';
import { setCurrentUserInfo, setModifiableUserInfo } from '../../actions/userInfoActions';
import { modifyUserInfo } from '../../api/userInfoApi';

// контейнер для формы с информацией о юзере
class UserInfoFormContainer extends PureComponent {

    constructor(props) {
        super(props);
    }
    
    //todo: сделать обновление по изменению аксесс токена или роли юзера
    
    render() {
        debugger;

        const userInfoForm = this.props.currentUserInfo
                                ?
                                <UserInfoForm
                                    userInfo = {this.props.currentUserInfo}
                                    modifiableUserInfo = {this.props.modifiableUserInfo}
                                    resetCurrentUserInfo = {this.props.resetCurrentUserInfo}
                                    setModifiableUserInfo = {this.props.setModifiableUserInfo}
                                    modifyUserInfo = {modifyUserInfo}
                                    
                                    colorTheme = {this.props.colorTheme}
                                />
                                :
                                null;

        return (
            <div>{userInfoForm}</div>
        );
    }
}

const mapStateToProps = function(store) {
    return {
        currentUserInfo: store.userInfoState.get('currentUserInfo'),
        modifiableUserInfo: store.userInfoState.get('modifiableUserInfo'),

        colorTheme: store.forumDesignState.get('colorTheme'),
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