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

        this.isUserAuthenticated = false;

        this.setNewPrivateMessagesCount = this.setNewPrivateMessagesCount.bind(this);
        this.doLogout = this.doLogout.bind(this);
        this.showUserInfo = this.showUserInfo.bind(this);
    }

    componentDidMount() {
        debugger;

        return Promise.resolve(true)
			.then(() => {
				return getActualAccessToken();
			})
			.then(accessToken => {
                this.isUserAuthenticated = true;
                
                return this.setNewPrivateMessagesCount();
            })
            .catch(error => {
                debugger;
                this.isUserAuthenticated = false;

                // const message = baseUtils.getErrorResponseMessage(error);  //?

                // const alertData = {
                //     message: message,
                    
                // };

				// this.props.setAlertData(alertData);
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
            });
    }

    showUserInfo() {
        debugger;

        return getUserInfoAndSetCurrentUserInfo(null, true)
            .then(result => true)
            .catch(error => {
                const message = baseUtils.getErrorResponseMessage(error);  //?

                const alertData = {
                    message: message,
                };

				this.props.setAlertData(alertData);
			})
    }

    doLogout() {
        debugger;

        return logout()
			.then(response => {
                debugger; 
                return true;
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
            <Menu
                isUserAuthenticated = {this.isUserAuthenticated}
                newPrivateMessagesCount = {this.props.newPrivateMessagesCount}
                doLogout = {this.doLogout}
                showUserInfo = {this.showUserInfo}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        // accessToken: store.authState.get('accessToken'),
        // refreshToken: store.authState.get('refreshToken'),
        // accessTokenExpiresIn: store.authState.get('accessTokenExpiresIn'),

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