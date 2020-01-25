'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Channel from '../views/channel';
import { getPrivateChannels, deletePrivateChannel } from '../../api/privateChannelApi';
import { setPrivateChannels } from '../../actions/privateChannelActions';
import { setCurrentUserInfo } from '../../actions/userInfoActions';
import { setNewPrivateMessagesCount } from '../../actions/notificationActions';
import { getUserInfoAndSetCurrentUserInfo } from '../../api/userInfoApi';
import { joinRoom, leaveRoom } from '../../actions/remoteActions';
import forumConst from '../../constants/forumConst';

class PrivateSubSectionContainer extends PureComponent {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        debugger;

        return getPrivateChannels()
            .then(results => {
                //this.props.joinRoom(this.userId);  //? один раз в самом начале?
                this.props.setPrivateChannels(results);

                return true;
            });
    }

    componentWillUnmount() {
        if (this.props.privateChannels) {
            this.props.resetPrivateChannels();  //?
        }

        if (this.props.currentUserInfo) {
            this.props.resetCurrentUserInfo();
        }
    }
    
    render() {
        //console.log('render privateSubSectionContainer');
        debugger;
        const className = '';

        const channels = [];
        let key = 0;

        if (this.props.privateChannels) {
            this.props.privateChannels.forEach(function(item) {
                const channel = <Channel
                                    key={key}
                                    channel = {item}
                                    deletePrivateChannel = {deletePrivateChannel}
                                    type = {forumConst.itemTypes.privateChannel}

                                    showUserInfoById = {getUserInfoAndSetCurrentUserInfo}
                                />;
                channels.push(channel);
                key++;
            }.bind(this));
        }

        return (
            <div className = {className}>

                <div>---ЛИЧНЫЕ СООБЩЕНИЯ---</div>

                {channels}
            </div>
        )
    }
}


const mapStateToProps = function(store) {
    return {
        privateChannels: store.privateChannelState.get('privateChannels'),   
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        setPrivateChannels: function(items) {
            dispatch(setPrivateChannels(items));
        },
        resetPrivateChannels: function() {
            dispatch(setPrivateChannels(null));
        },
        resetCurrentUserInfo: function() {
            dispatch(setCurrentUserInfo(null));
        },
        joinRoom: function(id) {
            dispatch(joinRoom(id));
        },
        leaveRoom: function(id) {
            dispatch(leaveRoom(id));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateSubSectionContainer);