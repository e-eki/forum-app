'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import SubSection from '../views/subSection';
import { getSubSectionById, getSubSections } from '../../api/subSectionApi';
import * as channelApi from '../../api/channelApi';
import { setCurrentSubSection } from '../../actions/subSectionActions';
import { setModifiableChannel, setCurrentInfoChannel, setMovingChannel } from '../../actions/channelActions';
import { joinRoom, leaveRoom, deleteChannelById } from '../../actions/remoteActions';
import { setParentItemsList } from '../../actions/modifyingActions';
import * as baseUtils from '../../utils/baseUtils';

// контейнер для подраздела
class SubSectionContainer extends PureComponent {

    constructor(props) {
        super(props);

        // id подраздела
        this.subSectionId = null;

        this.getSubSection = this.getSubSection.bind(this);
    }

    componentDidMount() {
        return this.getSubSection();
    }

    componentWillUnmount() {
        // при уходе со страницы подраздела отправляем на сервер событие о выходе из комнаты с id подраздела
        if (this.subSectionId) {
            this.props.leaveRoom(this.subSectionId);
        }
        
        this.props.resetCurrentSubSection();
        this.props.setParentItemsList(null);
    }

    componentDidUpdate(prevProps) {
        // если изменились данные токенов, могли измениться доступные элементы управления, перерисоваем изменившиеся
        if (this.props.accessToken !== prevProps.accessToken  ||
            this.props.userRole !== prevProps.userRole) {
                return this.getSubSection();
        }

        // если чат в подразделе выбран для перемещения, то нужно установить список подразделов (для перемещения в нем)
        if (this.props.movingChannel &&
            !this.props.parentItemsList) {
                return getSubSections()
                    .then(subSections => {
                        this.props.setParentItemsList(subSections || []);
                    })
                    .catch(error => {
                        baseUtils.showErrorMessage(error);
                        return false;
                    })
        }
    }

    // получить подраздел
    getSubSection() {
        if (this.props.match && this.props.match.params) {
            const id = this.props.match.params.id;
            return getSubSectionById(id)
                .then(subSection => {
                    
                    if (subSection) {
                        this.props.setCurrentSubSection(subSection);

                        // отправляем на сервер событие о присоединении к комнате с id подраздела
                        this.props.joinRoom(subSection.id);
                        this.subSectionId = subSection.id;
                    }

                    return true;
                })
                .catch(error => {
                    baseUtils.showErrorMessage(error);
                    return false;
                })
        }
    }
    
    render() {
        return (
            <SubSection
                subSection = {this.props.currentSubSection}
                isCurrent = {true}

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

        accessToken: store.authState.get('accessToken'),
        userRole: store.authState.get('userRole'),
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
        joinRoom: function(id) {
            dispatch(joinRoom(id));
        },
        leaveRoom: function(id) {
            dispatch(leaveRoom(id));
        },
        deleteChannelById: function(channelId, subSectionId) {
            dispatch(deleteChannelById(channelId, subSectionId));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubSectionContainer);