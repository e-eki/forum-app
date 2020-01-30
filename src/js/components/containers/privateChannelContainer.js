'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Channel from '../views/channel';
import * as privateChannelApi from '../../api/privateChannelApi';
import { setPrivateChannels } from '../../actions/privateChannelActions';
import { setCurrentUserInfo } from '../../actions/userInfoActions';
import { getUserInfoAndSetCurrentUserInfo } from '../../api/userInfoApi';
import * as messageApi from '../../api/messageApi';
import { setModifiableMessage, setCurrentInfoMessage } from '../../actions/messageActions';
import { joinRoom, leaveRoom } from '../../actions/remoteActions';
import { setCurrentPrivateChannel } from '../../actions/privateChannelActions';
import { setNewPrivateMessagesCount } from '../../actions/notificationActions';
import forumConst from '../../constants/forumConst';
import { setDescriptionMessageForChannel } from '../../utils/channelUtils';

class PrivateChannelContainer extends PureComponent {

    constructor(props) {
        super(props);

        this.recipientId = null;
        this.recipientChannelId = null;
        this.channelId = null;
        this.roomType = forumConst.itemTypes.privateChannel;

        this.updateNewPrivateMessagesCount = this.updateNewPrivateMessagesCount.bind(this);
        this.getPrivateChannel = this.getPrivateChannel.bind(this);
        this.resetPrivateChannelContainer = this.resetPrivateChannelContainer.bind(this);
        this.setDescriptionMessage = this.setDescriptionMessage.bind(this);
        this.resetDescriptionMessage = this.resetDescriptionMessage.bind(this);
    }

    componentDidMount() {
        debugger;
        return this.getPrivateChannel()
            .then(result => {
                this.updateNewPrivateMessagesCount();
            })
    }

    componentWillUnmount() {
        this.resetPrivateChannelContainer();
    }

    componentDidUpdate() {
        debugger;
        this.getPrivateChannel();
    }

    updateNewPrivateMessagesCount() {
        debugger;
        if (this.props.newPrivateMessagesCount &&   //todo: check!
            this.props.currentPrivateChannel &&
            this.props.currentPrivateChannel.newMessagesCount) {
                const newCount = this.props.newPrivateMessagesCount - this.props.currentPrivateChannel.newMessagesCount;
                this.props.setNewPrivateMessagesCount(newCount);
        }
    }

    getPrivateChannel() {
        debugger;

        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            const newChannelId = this.props.match.params.id;

            if (newChannelId && (newChannelId !== this.channelId)) {

                this.resetPrivateChannelContainer();
                this.channelId = newChannelId;

                return privateChannelApi.getPrivateChannelById(newChannelId)
                .then(channel => {

                    if (channel) {
                        this.props.joinRoom(channel.id, this.roomType, this.props.userId);
                        this.channelId = channel.id;

                        this.props.setCurrentPrivateChannel(channel);
                    }

                    return true;
                });
            }
        }
        else if (this.props.location && this.props.location.search) {
            const newRecipientId = new URLSearchParams(this.props.location.search).get("recipientId");

            if (newRecipientId && (newRecipientId !== this.recipientId)) {

                this.resetPrivateChannelContainer();
                this.recipientId = newRecipientId;

                return privateChannelApi.getPrivateChannelByRecipientId(newRecipientId)
                    .then(privateChannel => {
                        debugger;

                        if (privateChannel) {
                            this.props.joinRoom(privateChannel.id, this.roomType, this.props.userId);
                            this.recipientChannelId = privateChannel.id;

                            this.props.setCurrentPrivateChannel(privateChannel);
                        }

                        return true;
                    });
            }
        }
    }

    resetPrivateChannelContainer() {
        debugger;

        if (this.channelId) {
            this.props.leaveRoom(this.channelId, this.roomType, this.props.userId);
            this.channelId = null;
        }
        else if (this.recipientId && this.recipientChannelId) {  //??
            //this.props.leaveRoom(this.recipientChannelId);
            this.recipientId = null;
            this.recipientChannelId = null
        }

        if (this.props.currentUserInfo) {
            this.props.resetCurrentUserInfo();
        }

        this.props.resetCurrentPrivateChannel();
    }

    setDescriptionMessage(message) {
        debugger;

        return setDescriptionMessageForChannel(forumConst.itemTypes.privateChannel, message, this.props.currentPrivateChannel)
            .then(result => true);
    }

    resetDescriptionMessage() {
        debugger;

        return setDescriptionMessageForChannel(forumConst.itemTypes.privateChannel, null, this.props.currentPrivateChannel)
            .then(result => true);
    }
    
    render() {
        //console.log('render privateChannelContainer');
        debugger;

        return (
            <div>

                <Channel
                    channel = {this.props.currentPrivateChannel}
                    type = {forumConst.itemTypes.privateChannel}
                    isCurrent = {true}
                    deleteChannel = {privateChannelApi.deletePrivateChannel}

                    currentInfoMessage = {this.props.currentInfoMessage}
                    modifiableMessage = {this.props.modifiableMessage}
                    setCurrentInfoMessage = {this.props.setCurrentInfoMessage}
                    setModifiableMessage = {this.props.setModifiableMessage}
                    modifyMessage = {messageApi.modifyMessage}
                    deleteMessage = {messageApi.deleteMessage}

                    showUserInfoById = {getUserInfoAndSetCurrentUserInfo}

                    setDescriptionMessage = {this.setDescriptionMessage}
                    resetDescriptionMessage = {this.resetDescriptionMessage}
                />
            </div>
        );
    }
}


const mapStateToProps = function(store) {
    return {
        privateChannels: store.privateChannelState.get('privateChannels'),    
        currentPrivateChannel: store.privateChannelState.get('currentPrivateChannel'),
        currentInfoMessage: store.messageState.get('currentInfoMessage'),
        modifiableMessage: store.messageState.get('modifiableMessage'),
        newPrivateMessagesCount: store.notificationState.get('newPrivateMessagesCount'),
        userId: store.authState.get('userId'),
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        resetPrivateChannels: function() {
            dispatch(setPrivateChannels(null));
        },
        setCurrentPrivateChannel: function(item) {
            dispatch(setCurrentPrivateChannel(item));
        },
        resetCurrentPrivateChannel: function() {
            dispatch(setCurrentPrivateChannel(null));
        },
        resetCurrentUserInfo: function() {
            dispatch(setCurrentUserInfo(null));
        },
        setNewPrivateMessagesCount: function(data) {
            dispatch(setNewPrivateMessagesCount(data));
        },
        // modifyMessage: function(item) {
        //     messageApi.modifyMessage(item);
        // },
        // deleteMessage: function(item) {
        //     messageApi.deleteMessage(item);
        // },
        setModifiableMessage: function(item) {
            dispatch(setModifiableMessage(item));
        },
        setCurrentInfoMessage: function(item) {
            dispatch(setCurrentInfoMessage(item));
        },
        joinRoom: function(id, roomType, userId) {
            dispatch(joinRoom(id, roomType, userId));
        },
        leaveRoom: function(id, roomType, userId) {
            dispatch(leaveRoom(id, roomType, userId));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateChannelContainer);