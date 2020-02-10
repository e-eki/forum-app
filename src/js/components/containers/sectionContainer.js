'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Section from '../views/section';
import { getSectionById, getSections } from '../../api/sectionApi';
import * as subSectionApi from '../../api/subSectionApi';
import * as subSectionActions from '../../actions/subSectionActions';
import { joinRoom, leaveRoom, deleteSubSectionById } from '../../actions/remoteActions';
import { setCurrentInfoSection, setCurrentSection } from '../../actions/sectionActions';
import { setParentItemsList } from '../../actions/modifyingActions';
import * as baseUtils from '../../utils/baseUtils';

class SectionContainer extends PureComponent {

    constructor(props) {
        super(props);

        this.sectionId = null;

        this.getSection = this.getSection.bind(this);
    }

    componentDidMount() {
        return this.getSection();
    }

    componentWillUnmount() {
        if (this.sectionId) {
            this.props.leaveRoom(this.sectionId);
        }
        this.props.resetCurrentSection();  //?
        this.props.setParentItemsList(null);
    }

    componentDidUpdate(prevProps) {
        // если изменились данные токенов, могли измениться доступные элементы управления, перерисоваем изменившиеся
        if (this.props.accessToken !== prevProps.accessToken  ||
            this.props.userRole !== prevProps.userRole) {
                return this.getSection();
        }

        if (this.props.movingSubSection &&
            !this.props.parentItemsList) {
                return getSections()
                    .then(sections => {
                        this.props.setParentItemsList(sections.items || []);
                    })
                    .catch(error => {
                        baseUtils.showErrorMessage(error);
                        return false;
                    })
        }
    }

    getSection() {
        if (this.props.match && this.props.match.params) {
            const id = this.props.match.params.id;
            
            return getSectionById(id)
                .then(section => {
                    if (section) {
                        this.props.setCurrentSection(section);
                        
                        this.props.joinRoom(section.id);
                        this.sectionId = section.id;
                    }

                    return true;
                })
                .catch(error => {
                    baseUtils.showErrorMessage(error);
                    return false;
                })
        }
        else {
            return false;
        }
    }
    
    render() {
        //console.log('render SectionContainer');
        debugger;
        return (
            <Section
                section = {this.props.currentSection}
                isCurrent = {true}
                //setCurrentInfoSection = {this.props.setCurrentInfoSection}   //???

                currentInfoSubSection = {this.props.currentInfoSubSection}
                modifiableSubSection = {this.props.modifiableSubSection}
                movingSubSection = {this.props.movingSubSection}
                setCurrentInfoSubSection = {this.props.setCurrentInfoSubSection}
                setModifiableSubSection = {this.props.setModifiableSubSection}
                setMovingSubSection = {this.props.setMovingSubSection}
                modifySubSection = {subSectionApi.modifySubSection}
                deleteSubSection = {subSectionApi.deleteSubSection}
                deleteSubSectionById = {this.props.deleteSubSectionById}

                parentItemsList = {this.props.parentItemsList}
                resetParentItemsList = {this.props.resetParentItemsList}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        currentSection: store.sectionState.get('currentSection'),
        currentInfoSubSection: store.subSectionState.get('currentInfoSubSection'),
        modifiableSubSection: store.subSectionState.get('modifiableSubSection'),
        movingSubSection: store.subSectionState.get('movingSubSection'),
        parentItemsList: store.modifyingState.get('parentItemsList'),

        accessToken: store.authState.get('accessToken'),
        userRole: store.authState.get('userRole'),
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        // setCurrentInfoSection: function(item) {
        //     dispatch(setCurrentInfoSection(item));
        // },
        // modifySubSection: function(item) {
        //     subSectionApi.modifySubSection(item);
        // },
        // deleteSubSection: function(item) {
        //     subSectionApi.deleteSubSection(item);
        // },
        setModifiableSubSection: function(item) {
            dispatch(subSectionActions.setModifiableSubSection(item));
        },
        setMovingSubSection: function(item) {
            dispatch(subSectionActions.setMovingSubSection(item));
        },
        setCurrentInfoSubSection: function(item) {
            dispatch(subSectionActions.setCurrentInfoSubSection(item));
        },
        setCurrentSection: function(item) {
            dispatch(setCurrentSection(item));
        },
        resetCurrentSection: function() {
            dispatch(setCurrentSection(null));
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
        deleteSubSectionById: function(subSectionId, sectionId) {
            dispatch(deleteSubSectionById(subSectionId, sectionId));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionContainer);