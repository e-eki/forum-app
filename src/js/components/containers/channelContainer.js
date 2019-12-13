'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import forumConst from '../../constants/forumConst';
import Channel from '../views/channel';
import { setCurrentUserInfo } from '../../actions/userInfoActions';
import { getChannelById } from '../../api/channelApi';
import { getUserInfoByIdAndSetCurrentUserInfo } from '../../api/userInfoApi';
import * as messageApi from '../../api/messageApi';
import { setModifiableMessage, setCurrentInfoMessage } from '../../actions/messageActions';
import { joinRoom, leaveRoom } from '../../actions/remoteActions';
import { setCurrentInfoChannel, setCurrentChannel } from '../../actions/channelActions';
import { setDescriptionMessageForChannel } from '../../lib/channelUtils';

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
                    setCurrentInfoChannel = {this.props.setCurrentInfoChannel}

                    currentInfoMessage = {this.props.currentInfoMessage}
                    modifiableMessage = {this.props.modifiableMessage}
                    setCurrentInfoMessage = {this.props.setCurrentInfoMessage}
                    setModifiableMessage = {this.props.setModifiableMessage}
                    modifyMessage = {this.props.modifyMessage}
                    deleteMessage = {this.props.deleteMessage}

                    showUserInfoById = {getUserInfoByIdAndSetCurrentUserInfo}

                    setDescriptionMessage = {this.setDescriptionMessage}
                    resetDescriptionMessage = {this.resetDescriptionMessage}
                />
            </div>
        );
    }
}

const mapStateToProps = function(store) {
    return {
        currentUserInfo: store.userInfo.get('currentUserInfo'),      
        currentChannel: store.channelState.get('currentChannel'),
        currentInfoMessage: store.messageState.get('currentInfoMessage'),
        modifiableMessage: store.messageState.get('modifiableMessage'),
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