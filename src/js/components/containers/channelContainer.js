'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import forumConst from '../../constants/forumConst';
import Channel from '../views/channel';
import { setCurrentUserInfo } from '../../actions/userInfoActions';
import { getChannelById } from '../../api/channelApi';
import { getPrivateChannelByRecipientId } from '../../api/privateChannelApi';
import { getUserInfoById } from '../../api/userInfoApi';
import UserInfoForm from '../views/forms/userInfoForm';
import * as messageApi from '../../api/messageApi';
import { setModifiableMessage, setCurrentInfoMessage } from '../../actions/messageActions';
import { joinRoom, leaveRoom } from '../../actions/remoteActions';
import { setCurrentInfoChannel, setCurrentChannel } from '../../actions/channelActions';
import { setCurrentPrivateChannel } from '../../actions/privateChannelActions';
import { deletePrivateChannel } from '../../api/privateChannelApi';

class ChannelContainer extends PureComponent {

    constructor(props) {
        super(props);

        this.channelId = null;
    }

    componentDidMount() {
        debugger;

        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            const channelId = this.props.match.params.id;

            return getChannelById(channelId)
                .then(channel => {
                    this.props.joinRoom(channel.id);
                    this.channelId = channel.id;

                    return true;
                });
        }
    }

    componentWillUnmount() {
        if (this.channelId) {
            this.props.leaveRoom(this.channelId);
        }

        if (this.props.currentUserInfo) {
            this.props.resetCurrentUserInfo();
        }

        this.props.resetCurrentChannel();
    }
    
    render() {
        //console.log('render ChannelContainer');
        debugger;

        let userInfoBlock;

        // if (this.props.currentUserInfo) {
        //     userInfoBlock = <UserInfoForm
        //                         userInfo = {this.props.currentUserInfo}
        //                         resetCurrentUserInfo = {this.props.resetCurrentUserInfo}
        //                         isPrivateChannel = {false}
        //                     />;
        // }

        return (
            <div>
                {/* {userInfoBlock} */}

                <Channel
                    channel = {this.props.currentChannel}
                    type = {forumConst.itemTypes.channel}
                    isCurrent = {true}
                    setCurrentInfoChannel = {this.props.setCurrentInfoChannel}

                    currentInfoMessage = {this.props.currentInfoMessage}
                    modifiableMessage = {this.props.modifiableMessage}
                    setCurrentInfoMessage = {this.props.setCurrentInfoMessage}
                    setModifiableMessage = {this.props.setModifiableMessage}
                    modifyMessage = {this.props.modifyMessage}
                    deleteMessage = {this.props.deleteMessage}

                    showUserInfoById = {getUserInfoById}
                />
            </div>
        );
    }
}

const mapStateToProps = function(store) {
    return {
        //currentUserInfo: store.userInfo.get('currentUserInfo'),       
        currentChannel: store.channelState.get('currentChannel'),
        currentInfoMessage: store.messageState.get('currentInfoMessage'),
        modifiableMessage: store.messageState.get('modifiableMessage'),
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        resetCurrentChannel: function() {
            dispatch(setCurrentChannel(null));
        },
        // resetCurrentUserInfo: function() {  //?
        //     dispatch(setCurrentUserInfo(null));
        // },
        setCurrentInfoChannel: function(item) {
            dispatch(setCurrentInfoChannel(item));
        },
        modifyMessage: function(item) {
            messageApi.modifyMessage(item);
        },
        deleteMessage: function(item) {
            messageApi.deleteMessage(item);
        },
        setModifiableMessage: function(item) {
            dispatch(setModifiableMessage(item));
        },
        setCurrentInfoMessage: function(item) {
            dispatch(setCurrentInfoMessage(item));
        },
        joinRoom: function(id) {
            dispatch(joinRoom(id));
        },
        leaveRoom: function(id) {
            dispatch(leaveRoom(id));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelContainer);