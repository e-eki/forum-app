'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import SubSection from '../views/subSection';
import { getSubSectionById } from '../../api/subSectionApi';
import * as channelApi from '../../api/channelApi';
import { setCurrentInfoSubSection } from '../../actions/subSectionActions';
import { setModifiableChannel, setCurrentInfoChannel } from '../../actions/channelActions';
import { joinRoom, leaveRoom } from '../../actions/remoteActions';

class SubSectionContainer extends PureComponent {

    constructor(props) {
        super(props);

        this.subSectionId = null;
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params) {
            const id = this.props.match.params.id;
            return getSubSectionById(id)
                .then(subSection => {
                    //this.props.setCurrentSection(section);
                    this.props.joinRoom(subSection.id);
                    this.subSectionId = subSection.id;

                    return true;
                });
        }
    }

    componentWillUnmount() {
        if (this.subSectionId) {
            this.props.leaveRoom(this.subSectionId);
        }
    }
    
    render() {
        //console.log('render SubSectionContainer');
        debugger;
        return (
            <SubSection
                subSection = {this.props.currentSubSection}
                isCurrent = {true}
                setCurrentInfoSubSection = {this.props.setCurrentInfoSubSection}

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

const mapStateToProps = function(store) {
    return {
        currentSubSection: store.subSectionState.get('currentSubSection'),
        currentInfoChannel: store.channelState.get('currentInfoChannel'),
        modifiableChannel: store.channelState.get('modifiableChannel'),
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        setCurrentInfoSubSection: function(item) {
            dispatch(setCurrentInfoSubSection(item));
        },
        modifyChannel: function(item) {
            channelApi.modifyChannel(item);
        },
        deleteChannel: function(item) {
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