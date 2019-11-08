'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import SubSection from '../views/subSection';
import { getSubSectionById } from '../../api/subSectionApi';
import * as channelApi from '../../api/channelApi';
import { setModifiableChannel, setCurrentInfoChannel } from '../../actions/channelActions';
import { joinRoom, leaveRoom } from '../../actions/remoteActions';

class SubSectionContainer extends PureComponent {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        debugger;
        if (this.props.match && this.props.match.params) {
            const id = this.props.match.params.id;
            return getSubSectionById(id)
                .then(subSection => {
                    debugger;
                    //this.props.setCurrentSection(section);
                    this.props.joinRoom(subSection.id);

                    return true;
                });
        }
    }

    componentWillUnmount() {
        debugger;
        this.props.leaveRoom(this.props.currentSubSection.id);
    }
    
    render() {
        console.log('render SubSectionContainer');
        return (
            <SubSection
                subSection = {this.props.currentSubSection}
                isCurrent = {true}

                currentInfoChannel = {this.props.currentInfoChannel}
                modifiableChannel = {this.props.modifiableChannel}
                setCurrentInfoChannel = {this.props.setCurrentInfoChannel}
                setModifiableChannel = {this.props.setModifiableChannel}
                modifyChannel = {this.props.modifyChannel}
                deleteChannel = {this.props.deleteChannel}
            />
        );
    }
}

const mapStateToProps = function(state) {
    return {
        currentSubSection: state.get('currentSubSection'),
        currentInfoChannel: state.get('currentInfoChannel'),
        modifiableChannel: state.get('modifiableChannel'),
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        modifyChannel: function(item) {
            channelApi.modifyChannel(item);
        },
        deleteSubSection: function(item) {
            channelApi.deleteChannel(item);
        },
        setModifiableChannel: function(item) {
            dispatch(setModifiableChannel(item));
        },
        setCurrentInfoChannel: function(item) {
            dispatch(setCurrentInfoChannel(item));
        },
        joinRoom: function(id) {
            dispatch(joinRoom(id));
        },
        leaveRoom: function(id) {
            dispatch(leaveRoom(id));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubSectionContainer);