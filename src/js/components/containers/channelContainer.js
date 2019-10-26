'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Channel from '../views/channel';
import { setUserInfo } from '../../actions/channelActions';
import { getChannelById } from '../../api/channelApi';
import UserInfoForm from '../views/forms/userInfoForm';

class ChannelContainer extends PureComponent {

    componentDidMount() {
        debugger;
        if (this.props.match && this.props.match.params) {
            const id = this.props.match.params.id;
            getChannelById(id);
        }
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
                        hideUserInfo = {this.props.hideUserInfo}>
                    </UserInfoForm>
                    : null
                }
                <Channel 
                    data = {this.props.data}
                    isCurrent = {true}
                    userInfo = {this.props.userInfo} 
                />
            </div>           
        );
    }
}

const mapStateToProps = function(state) {
    debugger;
    return {
        data: state.get('currentChannel'),
        userInfo: state.get('userInfo'),
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        hideUserInfo: function() {
            dispatch(setUserInfo(null));
        }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ChannelContainer);