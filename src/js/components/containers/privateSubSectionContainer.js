'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Channel from '../views/channel';
import { getPrivateChannels, deletePrivateChannel } from '../../api/privateChannelApi';
import { setPrivateChannels } from '../../actions/privateChannelActions';
import { setCurrentUserInfo } from '../../actions/userInfoActions';
import { getUserInfoAndSetCurrentUserInfo } from '../../api/userInfoApi';
import { joinRoom, leaveRoom } from '../../actions/remoteActions';
import forumConst from '../../constants/forumConst';
import * as baseUtils from '../../utils/baseUtils';

// контейнер для страницы с личными чатами
class PrivateSubSectionContainer extends PureComponent {

    constructor(props) {
        super(props);

        this.getPrivateChannels = this.getPrivateChannels.bind(this);
    }

    componentDidMount() {
        return this.getPrivateChannels();
    }

    componentWillUnmount() {
        if (this.props.privateChannels) {
            this.props.resetPrivateChannels();  //?
        }

        if (this.props.currentUserInfo) {
            this.props.resetCurrentUserInfo();
        }
    }

    componentDidUpdate(prevProps) {
        // если изменились данные токенов, могли измениться доступные элементы управления, перерисоваем изменившиеся
        if (this.props.accessToken !== prevProps.accessToken  ||
            this.props.userRole !== prevProps.userRole) {
                if (this.props.accessToken) {
                    return this.getPrivateChannels();
                }
                else {
                    this.props.setPrivateChannels([]);  //??
                    return true;
                }
        }
    }

    // получить личные чаты юзера
    getPrivateChannels() {
        return getPrivateChannels()
            .then(results => {
                this.props.setPrivateChannels(results);
                return true;
            })
            .catch(error => {
                baseUtils.showErrorMessage(error);  //??
                //this.props.setPrivateChannels([]);
                return false;
            })
    }
    
    render() {
        debugger;
        const className = 'list-form';

        const channels = [];
        let key = 0;

        if (this.props.privateChannels) {
            this.props.privateChannels.forEach(function(item) {
                const channel = <Channel
                                    key={key}
                                    channel = {item}
                                    deletePrivateChannel = {deletePrivateChannel}
                                    type = {forumConst.itemTypes.privateChannel}

                                    showUserInfoById = {getUserInfoAndSetCurrentUserInfo}
                                />;
                channels.push(channel);
                key++;
            }.bind(this));
        }

        return (
            <div className = {className}>
                {channels}
            </div>
        )
    }
}


const mapStateToProps = function(store) {
    return {
        privateChannels: store.privateChannelState.get('privateChannels'),
        currentUserInfo: store.userInfoState.get('currentUserInfo'),

        accessToken: store.authState.get('accessToken'),
        userRole: store.authState.get('userRole'),
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        setPrivateChannels: function(items) {
            dispatch(setPrivateChannels(items));
        },
        resetPrivateChannels: function() {
            dispatch(setPrivateChannels(null));
        },
        resetCurrentUserInfo: function() {
            dispatch(setCurrentUserInfo(null));
        },
        joinRoom: function(id) {
            dispatch(joinRoom(id));
        },
        leaveRoom: function(id) {
            dispatch(leaveRoom(id));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateSubSectionContainer);