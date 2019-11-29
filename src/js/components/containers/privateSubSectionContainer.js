'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Channel from '../views/channel';
import UserInfoForm from '../views/forms/userInfoForm';
import { getPrivateChannels } from '../../api/privateChannelApi';
import { setPrivateChannels } from '../../actions/privateChannelActions';
import { setCurrentUserInfo } from '../../actions/userInfoActions';
import { getUserInfoById } from '../../api/userInfoApi';
import { joinRoom, leaveRoom } from '../../actions/remoteActions';
import forumConst from '../../constants/forumConst';

class PrivateSubSectionContainer extends PureComponent {

    constructor(props) {
        super(props);

        this.userId = '1';  //todo!
    }

    componentDidMount() {
        debugger;
        return getPrivateChannels()
            .then(results => {
                this.props.joinRoom(this.userId);

                return true;
            });
    }

    componentWillUnmount() {
        if (this.userId) {  //todo: userId!
            this.props.leaveRoom(this.userId);
        }
        this.props.resetPrivateChannels();  //?
    }
    
    render() {
        //console.log('render privateSubSectionContainer');
        debugger;
        const className = '';

        let userInfoBlock;

        if (this.props.currentUserInfo) {
            userInfoBlock = <UserInfoForm
                                userInfo = {this.props.currentUserInfo}
                                resetCurrentUserInfo = {this.props.resetCurrentUserInfo}
                                isPrivateChannel = {true}
                            />;
        }

        const channels = [];
        let key = 0;

        if (this.props.privateChannels) {
            this.props.privateChannels.forEach(function(item) {
                const channel = <Channel
                                    key={key}
                                    channel = {item}
                                    deletePrivateChannel = {privateChannelApi.deletePrivateChannel}
                                    type = {forumConst.itemTypes.privateChannel}

                                    showUserInfoById = {getUserInfoById}
                                />;
                channels.push(channel);
                key++;
            }.bind(this));
        }

        return (
            <div className = {className}>
                {userInfoBlock}

                <div>---ЛИЧНЫЕ СООБЩЕНИЯ---</div>

                {channels}
            </div>
        )
    }
}


const mapStateToProps = function(store) {
    return {
        privateChannels: store.privateChannelState.get('privateChannels'),
        currentUserInfo: store.userInfo.get('currentUserInfo'),           
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        resetPrivateChannels: function() {
            dispatch(setPrivateChannels(null));
        },
        setCurrentUserInfo: function(item) {
            dispatch(setCurrentUserInfo(item));
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