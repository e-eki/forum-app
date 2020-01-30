'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import SubSection from '../views/subSection';
import { getSubSectionById, getSubSections } from '../../api/subSectionApi';
import * as channelApi from '../../api/channelApi';
import { setCurrentInfoSubSection, setCurrentSubSection } from '../../actions/subSectionActions';
import { setModifiableChannel, setCurrentInfoChannel, setMovingChannel } from '../../actions/channelActions';
import { joinRoom, leaveRoom, deleteChannelById } from '../../actions/remoteActions';
import { setParentItemsList } from '../../actions/modifyingActions';

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
                    
                    if (subSection) {
                        this.props.setCurrentSubSection(subSection);

                        this.props.joinRoom(subSection.id);
                        this.subSectionId = subSection.id;
                    }

                    return true;
                });
        }
    }

    componentWillUnmount() {
        if (this.subSectionId) {
            this.props.leaveRoom(this.subSectionId);
        }
        
        this.props.resetCurrentSubSection();  //?
    }

    componentDidUpdate() {
        debugger;

        if (this.props.movingChannel) {
            return getSubSections()    //?
                .then(subSections => {
                    debugger;
                    this.props.setParentItemsList(subSections);
                })
        }
    }
    
    render() {
        //console.log('render SubSectionContainer');

        return (
            <SubSection
                subSection = {this.props.currentSubSection}
                isCurrent = {true}
                //setCurrentInfoSubSection = {this.props.setCurrentInfoSubSection}   //todo: info|modify check!!!

                currentInfoChannel = {this.props.currentInfoChannel}
                modifiableChannel = {this.props.modifiableChannel}
                movingChannel = {this.props.movingChannel}
                setCurrentInfoChannel = {this.props.setCurrentInfoChannel}
                setModifiableChannel = {this.props.setModifiableChannel}
                setMovingChannel = {this.props.setMovingChannel}
                modifyChannel = {channelApi.modifyChannel}
                deleteChannel = {channelApi.deleteChannel}
                deleteChannelById = {this.props.deleteChannelById}

                parentItemsList = {this.props.parentItemsList}
                resetParentItemsList = {this.props.resetParentItemsList}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        currentSubSection: store.subSectionState.get('currentSubSection'),
        currentInfoChannel: store.channelState.get('currentInfoChannel'),
        modifiableChannel: store.channelState.get('modifiableChannel'),
        movingChannel: store.channelState.get('movingChannel'),
        parentItemsList: store.modifyingState.get('parentItemsList'),
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        setCurrentSubSection: function(item) {
            dispatch(setCurrentSubSection(item));
        },
        resetCurrentSubSection: function() {
            dispatch(setCurrentSubSection(null));
        },
        // setCurrentInfoSubSection: function(item) {
        //     dispatch(setCurrentInfoSubSection(item));
        // },
        // modifyChannel: function(item) {
        //     channelApi.modifyChannel(item);
        // },
        // deleteChannel: function(item) {
        //     channelApi.deleteChannel(item);
        // },
        setModifiableChannel: function(item) {
            dispatch(setModifiableChannel(item));
        },
        setMovingChannel: function(item) {
            dispatch(setMovingChannel(item));
        },
        setCurrentInfoChannel: function(item) {
            dispatch(setCurrentInfoChannel(item));
        },
        setParentItemsList: function(items) {
            dispatch(setParentItemsList(items));
        },
        resetParentItemsList: function() {
            dispatch(setParentItemsList(null));
        },
        joinRoom: function(id, roomType, userId) {
            dispatch(joinRoom(id, roomType, userId));
        },
        leaveRoom: function(id, roomType, userId) {
            dispatch(leaveRoom(id, roomType, userId));
        },
        deleteChannelById: function(channelId, subSectionId) {
            dispatch(deleteChannelById(channelId, subSectionId));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubSectionContainer);