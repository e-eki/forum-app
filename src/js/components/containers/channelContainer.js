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

class ChannelContainer extends PureComponent {

    constructor(props) {
        super(props);

        this.channelId = null;

        this.setDescriptionMessage = this.setDescriptionMessage.bind(this);
        this.resetDescriptionMessage = this.resetDescriptionMessage.bind(this);
    }

    componentDidMount() {
        debugger;

        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            const channelId = this.props.match.params.id;

            return getChannelById(channelId)
                .then(channel => {
                    if (channel && channel.id) {
                        this.props.joinRoom(channel.id);
                        this.channelId = channel.id;

                        this.props.setCurrentChannel(channel);
                    }

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

    componentDidUpdate() {
        debugger;

        if (this.props.movingMessage) {
            return getChannels()    //?
                .then(channels => {
                    debugger;
                    this.props.setParentItemsList(channels);
                })
        }
    }

    setDescriptionMessage(message) {
        debugger;

        return setDescriptionMessageForChannel(forumConst.itemTypes.channel, message, this.props.currentChannel)
            .then(result => true);
    }

    resetDescriptionMessage() {
        debugger;

        return setDescriptionMessageForChannel(forumConst.itemTypes.channel, null, this.props.currentChannel)
            .then(result => true);
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
        joinRoom: function(id) {
            dispatch(joinRoom(id));
        },
        leaveRoom: function(id) {
            dispatch(leaveRoom(id));
        },
        deleteMessageById: function(messageId, channelId) {
            dispatch(deleteMessageById(messageId, channelId));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelContainer);