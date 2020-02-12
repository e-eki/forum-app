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
import * as baseUtils from '../../utils/baseUtils';
import { getUserId } from '../../utils/authUtils';

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
        // if (this.props.currentUserInfo) {
        //     this.props.resetCurrentUserInfo();
        // }

        return this.getPrivateChannel()
            .then(result => {
                this.updateNewPrivateMessagesCount();
            })
            .catch(error => {
                baseUtils.showErrorMessage(error);
                return false;
            })
    }

    componentWillUnmount() {
        this.resetPrivateChannelContainer();
    }

    componentDidUpdate(prevProps) {
        // если изменились данные токенов, могли измениться доступные элементы управления, перерисоваем изменившиеся
        if (this.props.accessToken !== prevProps.accessToken  ||
            this.props.userRole !== prevProps.userRole) {
                if (this.props.accessToken) {
                    return this.getPrivateChannel();
                }
                else {
                    this.props.setCurrentPrivateChannel(null);  //??
                    return true;
                }  
        }

        //return this.getPrivateChannel();
    }

    updateNewPrivateMessagesCount() {
        debugger;
        if (this.props.newPrivateMessagesCount &&
            this.props.currentPrivateChannel &&
            this.props.currentPrivateChannel.newMessagesCount) {
                let newCount = this.props.newPrivateMessagesCount - this.props.currentPrivateChannel.newMessagesCount;

                if (newCount < 0) {   // костылик от багов
                    newCount = 0;
                }

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
                            const userId = getUserId();
                            this.props.joinRoom(channel.id, this.roomType, userId);
                            this.channelId = channel.id;

                            this.props.setCurrentPrivateChannel(channel);
                        }

                        return true;
                    })
                    .catch(error => {
                        baseUtils.showErrorMessage(error);
                        return false;
                    })
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
                            const userId = getUserId();
                            this.props.joinRoom(privateChannel.id, this.roomType, userId);
                            this.recipientChannelId = privateChannel.id;

                            this.props.setCurrentPrivateChannel(privateChannel);
                        }

                        return true;
                    })
                    .catch(error => {
                        baseUtils.showErrorMessage(error);
                        return false;
                    })
            }
        }
    }

    resetPrivateChannelContainer() {
        debugger;

        if (this.channelId) {
            const userId = getUserId();
            this.props.leaveRoom(this.channelId, this.roomType, userId);
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
        return setDescriptionMessageForChannel(forumConst.itemTypes.privateChannel, message, this.props.currentPrivateChannel)
            .then(result => true)
            .catch(error => {
                baseUtils.showErrorMessage(error);
                return false;
            })
    }

    resetDescriptionMessage() {
        return setDescriptionMessageForChannel(forumConst.itemTypes.privateChannel, null, this.props.currentPrivateChannel)
            .then(result => true)
            .catch(error => {
                baseUtils.showErrorMessage(error);
                return false;
            })
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
        //userId: store.authState.get('userId'),
        currentUserInfo: store.userInfoState.get('currentUserInfo'),

        accessToken: store.authState.get('accessToken'),
        userRole: store.authState.get('userRole'),
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