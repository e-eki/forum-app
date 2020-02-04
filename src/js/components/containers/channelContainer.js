'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import forumConst from '../../constants/forumConst';
import Channel from '../views/channel';
import { setCurrentUserInfo } from '../../actions/userInfoActions';
import { getChannelById, getChannels } from '../../api/channelApi';
import { getUserInfoAndSetCurrentUserInfo } from '../../api/userInfoApi';
import * as messageApi from '../../api/messageApi';
import { setModifiableMessage, setCurrentInfoMessage, setMovingMessage } from '../../actions/messageActions';
import { joinRoom, leaveRoom, deleteMessageById } from '../../actions/remoteActions';
import { setCurrentInfoChannel, setCurrentChannel } from '../../actions/channelActions';
import { setDescriptionMessageForChannel } from '../../utils/channelUtils';
import { setParentItemsList } from '../../actions/modifyingActions';
import * as baseUtils from '../../utils/baseUtils';

class ChannelContainer extends PureComponent {

    constructor(props) {
        super(props);

        this.channelId = null;
        this.roomType = forumConst.itemTypes.channel;

        this.getChannel = this.getChannel.bind(this);
        this.setDescriptionMessage = this.setDescriptionMessage.bind(this);
        this.resetDescriptionMessage = this.resetDescriptionMessage.bind(this);
    }

    componentDidMount() {
        debugger;

        return this.getChannel();
    }

    componentWillUnmount() {
        if (this.channelId) {
            this.props.leaveRoom(this.channelId, this.roomType, this.props.userId);
        }

        if (this.props.currentUserInfo) {
            this.props.resetCurrentUserInfo();
        }

        this.props.resetCurrentChannel();
        this.props.setParentItemsList(null);
    }

    componentDidUpdate() {
        // если изменились данные токенов, могли измениться доступные элементы управления, перерисоваем изменившиеся
        if (this.props.accessToken !== prevProps.accessToken) {
            return this.getChannel();
        }

        if (this.props.movingMessage &&
            !this.props.parentItemsList) {
                return getChannels()
                    .then(channels => {
                        this.props.setParentItemsList(channels || []);
                    })
                    .catch(error => {
                        baseUtils.showErrorMessage(error);
                        return false;
                    })
        }
    }

    getChannel() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            const channelId = this.props.match.params.id;

            return getChannelById(channelId)
                .then(channel => {
                    if (channel && channel.id) {
                        this.props.joinRoom(channel.id, this.roomType, this.props.userId);
                        this.channelId = channel.id;

                        this.props.setCurrentChannel(channel);
                    }

                    return true;
                })
                .catch(error => {
                    baseUtils.showErrorMessage(error);
                    return false;
                })
        }
        else {
            return false;
        }
    }

    setDescriptionMessage(message) {
        debugger;

        return setDescriptionMessageForChannel(forumConst.itemTypes.channel, message, this.props.currentChannel)
            .then(result => true)
            .catch(error => {
                baseUtils.showErrorMessage(error);
                return false;
            })
    }

    resetDescriptionMessage() {
        debugger;

        return setDescriptionMessageForChannel(forumConst.itemTypes.channel, null, this.props.currentChannel)
            .then(result => true)
            .catch(error => {
                baseUtils.showErrorMessage(error);
                return false;
            })
    }
    
    render() {
        //console.log('render ChannelContainer');
        debugger;

        return (
            <div>
                <Channel
                    channel = {this.props.currentChannel}
                    type = {forumConst.itemTypes.channel}
                    isCurrent = {true}
                    //setCurrentInfoChannel = {this.props.setCurrentInfoChannel}    //????

                    currentInfoMessage = {this.props.currentInfoMessage}
                    modifiableMessage = {this.props.modifiableMessage}
                    movingMessage = {this.props.movingMessage}
                    setCurrentInfoMessage = {this.props.setCurrentInfoMessage}
                    setModifiableMessage = {this.props.setModifiableMessage}
                    setMovingMessage = {this.props.setMovingMessage}
                    modifyMessage = {messageApi.modifyMessage}
                    deleteMessage = {messageApi.deleteMessage}
                    showUserInfoById = {getUserInfoAndSetCurrentUserInfo}
                    setDescriptionMessage = {this.setDescriptionMessage}
                    resetDescriptionMessage = {this.resetDescriptionMessage}
                    deleteMessageById = {this.props.deleteMessageById}

                    parentItemsList = {this.props.parentItemsList}
                    resetParentItemsList = {this.props.resetParentItemsList}
                />
            </div>
        );
    }
}

const mapStateToProps = function(store) {
    return {  
        currentChannel: store.channelState.get('currentChannel'),
        currentInfoMessage: store.messageState.get('currentInfoMessage'),
        modifiableMessage: store.messageState.get('modifiableMessage'),
        movingMessage: store.messageState.get('movingMessage'),
        parentItemsList: store.modifyingState.get('parentItemsList'),
        userId: store.authState.get('userId'),
        accessToken: store.authState.get('accessToken'),
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        setCurrentChannel: function(item) {
            dispatch(setCurrentChannel(item));
        },
        resetCurrentChannel: function() {
            dispatch(setCurrentChannel(null));
        },
        resetCurrentUserInfo: function() {
            dispatch(setCurrentUserInfo(null));
        },
        // setCurrentInfoChannel: function(item) {
        //     dispatch(setCurrentInfoChannel(item));
        // },
        // modifyMessage: function(item) {
        //     messageApi.modifyMessage(item);
        // },
        // deleteMessage: function(item) {
        //     messageApi.deleteMessage(item);
        // },
        setModifiableMessage: function(item) {
            dispatch(setModifiableMessage(item));
        },
        setMovingMessage: function(item) {
            dispatch(setMovingMessage(item));
        },
        setCurrentInfoMessage: function(item) {
            dispatch(setCurrentInfoMessage(item));
        },
        setParentItemsList: function(items) {
            dispatch(setParentItemsList(items));
        },
        resetParentItemsList: function() {
            dispatch(setParentItemsList(null));
        },
        joinRoom: function(id, roomType, userId) {
            dispatch(joinRoom(id, roomType, userId));
        },
        leaveRoom: function(id, roomType, userId) {
            dispatch(leaveRoom(id, roomType, userId));
        },
        deleteMessageById: function(messageId, channelId) {
            dispatch(deleteMessageById(messageId, channelId));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelContainer);