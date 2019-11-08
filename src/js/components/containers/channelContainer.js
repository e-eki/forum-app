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
                    debugger;
                    //this.props.setCurrentSection(section);
                    this.props.joinRoom(channel.id);

                    return true;
                });
        }
    }

    componentWillUnmount() {
        //this.props.resetUserInfo();

        this.props.leaveRoom(this.props.currentSubSection.id);
    }
    
    render() {
        console.log('render ChannelContainer');
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

                currentInfoMessage = {this.props.currentInfoMessage}
                modifiableMessage = {this.props.modifiableMessage}
                setCurrentInfoMessage = {this.props.setCurrentInfoMessage}
                setModifiableMessage = {this.props.setModifiableMessage}
                modifyMessage = {this.props.modifyMessage}
                deleteMessage = {this.props.deleteMessage}
            />
        );
    }
}

const mapStateToProps = function(state) {
    debugger;
    return {
        // currentChannel: state.get('currentChannel'),
        // currentUserChannel: state.get('currentUserChannel'),
        // userInfo: state.get('userInfo'),

        currentChannel: state.get('currentChannel'),
        currentInfoMessage: state.get('currentInfoMessage'),
        modifiableMessage: state.get('modifiableMessage'),
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        // getUserInfo: function(id) {
        //     getUserInfoById(id);
        // },
        // resetUserInfo: function() {
        //     dispatch(setUserInfo(null));
        // },
        // resetCurrentChannel: function() {
        //     dispatch(setCurrentChannel(null));
        // },
        // resetCurrentUserChannel: function() {
        //     dispatch(setCurrentUserChannel(null));
        // },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelContainer);