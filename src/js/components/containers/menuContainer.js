'use strict';

import Promise from 'bluebird';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Menu from '../views/menu';
import { getPrivateChannels } from '../../api/privateChannelApi';
import { setNewPrivateMessagesCount } from '../../actions/notificationActions';
import { setAlertData } from '../../actions/alertDataActions';
import * as baseUtils from '../../utils/baseUtils';
import appConst from '../../constants/appConst';
import { getActualAccessToken, logout } from '../../api/authApi';
import { getUserInfoAndSetCurrentUserInfo } from '../../api/userInfoApi';

class MenuContainer extends PureComponent {

    constructor(props) {
        super(props);

        this.getUserAuthenticatedFlag = this.getUserAuthenticatedFlag.bind(this);
        this.setNewPrivateMessagesCount = this.setNewPrivateMessagesCount.bind(this);
        this.doLogout = this.doLogout.bind(this);
        this.showUserInfo = this.showUserInfo.bind(this);
    }

    componentDidMount() {
        debugger;
        return this.setNewPrivateMessagesCount()
            .then(result => true);
    }

    getUserAuthenticatedFlag() {
        debugger;

        return Promise.resolve(true)
			.then(() => {
				return getActualAccessToken();
			})
			.then(accessToken => {
                //return this.setNewPrivateMessagesCount();
                if (!accessToken) {
                    this.props.setNewPrivateMessagesCount(null);   //?
                }
                return true;
            })
            .catch(error => {
                //baseUtils.showErrorMessage(error); //?
                return false;
            })
    }

    setNewPrivateMessagesCount() {
        debugger;

        return getPrivateChannels()
            .then(privateChannels => {
                debugger;
                let newPrivateMessagesCount = 0;

                if (privateChannels && privateChannels.length) {
                    privateChannels.forEach(item => {  //?todo: reduce
                        newPrivateMessagesCount += (item.newMessagesCount || 0);
                    })

                    this.props.setNewPrivateMessagesCount(newPrivateMessagesCount);
                }

                return true;
            })
            .catch(error => {
                //baseUtils.showErrorMessage(error);  //?
                return false;
            })
    }

    showUserInfo() {
        debugger;

        return getUserInfoAndSetCurrentUserInfo(null, true)
            .then(result => true)
            .catch(error => {
                baseUtils.showErrorMessage(error);
                return false;
            })
    }

    doLogout() {
        debugger;

        return logout()
			.then(response => {
                debugger;

                const alertData = {
                    message: 'Вы успешно разлогинились. Нажмите ссылку для перехода.',
                    secondaryMessage: 'На главную',
                    secondaryLink: appConst.defaultLink,
                };

                this.props.setAlertData(alertData);

                return true;
			})
			.catch(error => {
                const message = baseUtils.getErrorResponseMessage(error);

                const alertData = {
                    message: message,
                    secondaryMessage: 'На главную',
                    secondaryLink: appConst.defaultLink,
                };

				this.props.setAlertData(alertData);
			})
    }
    
    render() {
        return (
            <Menu
                getUserAuthenticatedFlag = {this.getUserAuthenticatedFlag}
                newPrivateMessagesCount = {this.props.newPrivateMessagesCount}
                doLogout = {this.doLogout}
                showUserInfo = {this.showUserInfo}

                accessToken = {this.props.accessToken}  // чтобы компонент перерисовывался при изменении токенов
                // userRole = {this.props.userRole}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        accessToken: store.authState.get('accessToken'),   // чтобы компонент перерисовывался при изменении токенов
        // userRole: store.authState.get('userRole'),

        newPrivateMessagesCount: store.notificationState.get('newPrivateMessagesCount'),  
        //todo: check - reset нов.сообщений при переходе в личные сообщения
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        setAlertData: function(data) {
            dispatch(setAlertData(data));
        },
        setNewPrivateMessagesCount: function(data) {
            dispatch(setNewPrivateMessagesCount(data));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);