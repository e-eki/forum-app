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

class ChannelContainer extends PureComponent {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        debugger;
        if (this.props.match && this.props.match.params) {
            this.props.resetUserInfo();

            if (this.props.match.params.id) {
                this.props.resetCurrentUserChannel();
                const id = this.props.match.params.id;
                getChannelById(id);
            }
            else if (this.props.match.params.userId) {
                this.props.resetCurrentChannel();
                const id = this.props.match.params.userId;
                getUserChannelById(id);
            }
        }
    }

    componentWillUnmount() {
        this.props.resetUserInfo();
    }
    
    render() {
        console.log('render ChannelContainer');
        debugger;

        return (
            <div>
                {this.props.userInfo
                    ?
                    <UserInfoForm
                        userInfo = {this.props.userInfo}
                        currentUserChannel = {this.props.currentUserChannel}
                        resetUserInfo = {this.props.resetUserInfo}>
                    </UserInfoForm>
                    : null
                }
                <Channel 
                    currentChannel = {this.props.currentChannel}
                    currentUserChannel = {this.props.currentUserChannel}
                    isCurrent = {true}
                    userInfo = {this.props.userInfo} 
                    getUserInfo = {this.props.getUserInfo}
                />
            </div>           
        );
    }
}

const mapStateToProps = function(state) {
    debugger;
    return {
        currentChannel: state.get('currentChannel'),
        currentUserChannel: state.get('currentUserChannel'),
        userInfo: state.get('userInfo'),
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        getUserInfo: function(id) {
            getUserInfoById(id);
        },
        resetUserInfo: function() {
            dispatch(setUserInfo(null));
        },
        resetCurrentChannel: function() {
            dispatch(setCurrentChannel(null));
        },
        resetCurrentUserChannel: function() {
            dispatch(setCurrentUserChannel(null));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelContainer);