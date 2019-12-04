'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Channel from '../views/channel';
import UserInfoForm from '../views/forms/userInfoForm';
import { getPrivateChannels, deletePrivateChannel } from '../../api/privateChannelApi';
import { setPrivateChannels } from '../../actions/privateChannelActions';
import { setCurrentUserInfo } from '../../actions/userInfoActions';
import { setNewMessagesNotification } from '../../actions/notificationActions';
import { getUserInfoById } from '../../api/userInfoApi';
import { joinRoom, leaveRoom } from '../../actions/remoteActions';
import forumConst from '../../constants/forumConst';

class PrivateSubSectionContainer extends PureComponent {

    constructor(props) {
        super(props);

        this.userId = '5dd6d4c6d0412d25e4895fad';  //todo!
    }

    componentDidMount() {
        debugger;
        if (this.props.setNewMessagesNotification) {  //???
            this.props.resetNewMessagesNotification();
        }

        return getPrivateChannels()
            .then(results => {
                //this.props.joinRoom(this.userId);  //? один раз в самом начале?

                return true;
            });
    }

    componentWillUnmount() {
        // if (this.userId) {  //todo: userId!
        //     this.props.leaveRoom(this.userId);
        // }
        if (this.props.privateChannels) {
            this.props.resetPrivateChannels();  //?
        }

        if (this.props.currentUserInfo) {
            this.props.resetCurrentUserInfo();
        }
    }
    
    render() {
        //console.log('render privateSubSectionContainer');
        debugger;
        const className = '';

        // let userInfoBlock;

        // if (this.props.currentUserInfo) {
        //     userInfoBlock = <UserInfoForm
        //                         userInfo = {this.props.currentUserInfo}
        //                         resetCurrentUserInfo = {this.props.resetCurrentUserInfo}
        //                         isPrivateChannel = {true}
        //                     />;
        // }

        const channels = [];
        let key = 0;

        if (this.props.privateChannels) {
            this.props.privateChannels.forEach(function(item) {
                const channel = <Channel
                                    key={key}
                                    channel = {item}
                                    deletePrivateChannel = {deletePrivateChannel}
                                    type = {forumConst.itemTypes.privateChannel}

                                    showUserInfoById = {getUserInfoById}
                                />;
                channels.push(channel);
                key++;
            }.bind(this));
        }

        return (
            <div className = {className}>
                {/* {userInfoBlock} */}

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
        newMessages: store.notificationState.get('newMessages'),        
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        resetPrivateChannels: function() {
            dispatch(setPrivateChannels(null));
        },
        resetCurrentUserInfo: function() {
            dispatch(setCurrentUserInfo(null));
        },
        resetNewMessagesNotification: function() {
            dispatch(setNewMessagesNotification(null));
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