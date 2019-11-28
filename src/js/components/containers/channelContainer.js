'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
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
        this.recipientId = null;

        this.showUserInfoById = this.showUserInfoById.bind(this);
        this.resetChannelContainer = this.resetChannelContainer.bind(this);
        this.getChannelOrPrivateChannelById = this.getChannelOrPrivateChannelById.bind(this);
    }

    componentDidMount() {
        debugger;
        this.getChannelOrPrivateChannelById();
    }

    componentDidUpdate() {
        debugger;
        this.getChannelOrPrivateChannelById();
    }

    componentWillUnmount() {
        this.resetChannelContainer();

        // if (this.channelId) {
        //     this.props.resetCurrentChannel();  //?
        // }
        // else if (this.recipientId) {
        //     this.props.resetCurrentPrivateChannel();  //?
        // }
    }

    getChannelOrPrivateChannelById() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            const newChannelId = this.props.match.params.id;

            if (newChannelId && (newChannelId !== this.channelId)) {

                this.resetChannelContainer();
                this.channelId = newChannelId;

                return getChannelById(newChannelId)
                .then(channel => {
                    this.props.joinRoom(channel.id);
                    this.channelId = channel.id;

                    return true;
                });
            }
        }
        else if (this.props.location && this.props.location.search) {
            const newRecipientId = new URLSearchParams(this.props.location.search).get("recipientId");

            if (newRecipientId && (newRecipientId !== this.recipientId)) {

                this.resetChannelContainer();
                this.recipientId = newRecipientId;

                return getPrivateChannelByRecipientId(newRecipientId)
                    .then(privateChannel => {
                        debugger;
                        this.props.joinRoom(privateChannel.id);
                        this.channelId = privateChannel.id;

                        return true;
                    });
            }
        }
    }

    resetChannelContainer() {
        if (this.props.currentUserInfo) {
            this.props.resetCurrentUserInfo();
        }

        if (this.props.currentChannel) {
            this.props.resetCurrentChannel();
        }

        if (this.props.currentPrivateChannel) {
            this.props.resetCurrentPrivateChannel();
        }

        if (this.channelId) {
            this.props.leaveRoom(this.channelId);
            this.channelId = null;
        }
        else if (this.recipientId) {
            this.props.leaveRoom(this.recipientId);
            this.recipientId = null;
        }
    }

    //??todo: вынести в отдельные методы во всех контейнерах - методы апи и следующие за ними действия?
    showUserInfoById(id) {
        debugger;
        return getUserInfoById(id)
            .then(data => {
                debugger;
                this.props.setCurrentUserInfo(data);
            })
    }
    
    render() {
        //console.log('render ChannelContainer');
        debugger;

        let userInfoBlock;

        if (this.props.currentUserInfo) {
            userInfoBlock = <UserInfoForm
                                userInfo = {this.props.currentUserInfo}
                                resetCurrentUserInfo = {this.props.resetCurrentUserInfo}
                            />;
        }

        return (
            <div>
                {userInfoBlock}
            
                <Channel
                    channel = {this.props.currentChannel}
                    privateChannel = {this.props.currentPrivateChannel}
                    deletePrivateChannel = {deletePrivateChannel}
                    isCurrent = {true}
                    setCurrentInfoChannel = {this.props.setCurrentInfoChannel}

                    currentInfoMessage = {this.props.currentInfoMessage}
                    modifiableMessage = {this.props.modifiableMessage}
                    setCurrentInfoMessage = {this.props.setCurrentInfoMessage}
                    setModifiableMessage = {this.props.setModifiableMessage}
                    modifyMessage = {this.props.modifyMessage}
                    deleteMessage = {this.props.deleteMessage}

                    showUserInfoById = {this.showUserInfoById}
                />
            </div>
        );
    }
}

const mapStateToProps = function(store) {
    return {
        currentUserInfo: store.userInfo.get('currentUserInfo'),       
        currentChannel: store.channelState.get('currentChannel'),
        currentPrivateChannel: store.privateChannelState.get('currentPrivateChannel'),
        currentInfoMessage: store.messageState.get('currentInfoMessage'),
        modifiableMessage: store.messageState.get('modifiableMessage'),
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        resetCurrentChannel: function() {
            dispatch(setCurrentChannel(null));
        },
        resetCurrentPrivateChannel: function() {
            dispatch(setCurrentPrivateChannel(null));
        },
        setCurrentUserInfo: function(item) {
            dispatch(setCurrentUserInfo(item));
        },
        resetCurrentUserInfo: function() {  //?
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