'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Channel from '../views/channel';
import * as actions from '../../actions/actions';
import { getChannelById } from '../../api/channelApi';

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
        return (
          <Channel data = {this.props.data} isCurrent = {true} />
        );
    }
}

const mapStateToProps = function(state) {
    debugger;
    return {
        data: state.get('currentChannel')
    };
}

export default connect(mapStateToProps, actions)(ChannelContainer);