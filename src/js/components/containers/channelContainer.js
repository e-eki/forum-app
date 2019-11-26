'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Channel from '../views/channel';
import { setCurrentUserInfo } from '../../actions/userInfoActions';
import { getChannelById } from '../../api/channelApi';
import { getUserInfoById } from '../../api/userInfoApi';
import UserInfoForm from '../views/forms/userInfoForm';
import * as messageApi from '../../api/messageApi';
import { setModifiableMessage, setCurrentInfoMessage } from '../../actions/messageActions';
import { joinRoom, leaveRoom } from '../../actions/remoteActions';
import { setCurrentInfoChannel } from '../../actions/channelActions';

class ChannelContainer extends PureComponent {

    constructor(props) {
        super(props);

        this.channelId = null;

        this.showUserInfoById = this.showUserInfoById.bind(this);
    }

    componentDidMount() {
        // if (this.props.match && this.props.match.params) {
        //     this.props.resetUserInfo();

        //     if (this.props.match.params.id) {
        //         this.props.resetCurrentUserChannel();
        //         const id = this.props.match.params.id;
        //         getChannelById(id);
        //     }
        //     else if (this.props.match.params.userId) {
        //         this.props.resetCurrentChannel();
        //         const id = this.props.match.params.userId;
        //         getUserChannelById(id);
        //     }
        // }

        if (this.props.match && this.props.match.params) {
            const id = this.props.match.params.id;
            return getChannelById(id)
                .then(channel => {
                    this.props.joinRoom(channel.id);
                    this.channelId = channel.id;

                    return true;
                });
        }
    }

    componentWillUnmount() {
        this.props.resetCurrentUserInfo();

        if (this.channelId) {
            this.props.leaveRoom(this.channelId);
        }
    }

    //??todo: вынести в отдельные методы в контейнерах - методы апи и следующие за ними действия?
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
                                    currentUserInfo = {this.props.currentUserInfo}
                                    resetCurrentUserInfo = {this.props.resetCurrentUserInfo}
                                />;
            }

        return (
            <div>
                {userInfoBlock}
            
                <Channel
                    channel = {this.props.currentChannel}
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
        // // currentUserChannel: state.get('currentUserChannel'),
        currentUserInfo: store.userInfo.get('currentUserInfo'),
        
        currentChannel: store.channelState.get('currentChannel'),
        currentInfoMessage: store.messageState.get('currentInfoMessage'),
        modifiableMessage: store.messageState.get('modifiableMessage'),
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        setCurrentUserInfo: function(item) {
            dispatch(setCurrentUserInfo(item));
        },
        resetCurrentUserInfo: function() {  //?
            dispatch(setCurrentUserInfo(null));
        },
        // resetCurrentUserChannel: function() {
        //     dispatch(setCurrentUserChannel(null));
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