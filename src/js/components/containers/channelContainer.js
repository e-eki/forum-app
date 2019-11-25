'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Channel from '../views/channel';
import { setUserInfo } from '../../actions/userInfoActions';
import { setCurrentChannel } from '../../actions/channelActions';
import { setCurrentUserChannel } from '../../actions/userChannelActions';
import { getChannelById } from '../../api/channelApi';
import { getUserChannelById } from '../../api/userChannelApi';
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
        this.props.resetUserInfo();   //?

        if (this.channelId) {
            this.props.leaveRoom(this.channelId);
        }
    }

    showUserInfoById(id) {  //???
        debugger;
        return getUserInfoById(id)
            .then(data => {
                debugger;
                this.props.setCurrentUserInfo(response.data);
            })
    }
    
    render() {
        //console.log('render ChannelContainer');
        debugger;

        return (
            // <div>
            //     {this.props.userInfo
            //         ?
            //         <UserInfoForm
            //             userInfo = {this.props.userInfo}
            //             currentUserChannel = {this.props.currentUserChannel}
            //             resetUserInfo = {this.props.resetUserInfo}>
            //         </UserInfoForm>
            //         : null
            //     }
            //     <Channel 
            //         currentChannel = {this.props.currentChannel}
            //         currentUserChannel = {this.props.currentUserChannel}
            //         isCurrent = {true}
            //         userInfo = {this.props.userInfo} 
            //         getUserInfo = {this.props.getUserInfo}
            //     />
            // </div>   
            
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

                showUserInfoById = {this.props.showUserInfoById}
                userInfo = {this.props.userInfo}
                resetUserInfo = {this.props.resetUserInfo}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        // // currentChannel: state.get('currentChannel'),
        // // currentUserChannel: state.get('currentUserChannel'),
        userInfo: store.userInfo.get('currentUserInfo'),
        
        currentChannel: store.channelState.get('currentChannel'),
        currentInfoMessage: store.messageState.get('currentInfoMessage'),
        modifiableMessage: store.messageState.get('modifiableMessage'),
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        showUserInfoById: function(id) {    //??todo: вынести в отдельные методы в контейнерах - методы апи и следующие за ними действия?
            this.showUserInfoById(id);
        },
        setUserInfo: function(item) {
            dispatch(setUserInfo(item));
        },
        resetUserInfo: function() {  //?
            dispatch(setUserInfo(null));
        },
        // resetCurrentChannel: function() {
        //     dispatch(setCurrentChannel(null));
        // },
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