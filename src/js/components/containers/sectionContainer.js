'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Section from '../views/section';
import { getSectionById } from '../../api/sectionApi';
import * as subSectionApi from '../../api/subSectionApi';
import * as subSectionActions from '../../actions/subSectionActions';
import { joinRoom, leaveRoom } from '../../actions/remoteActions';
import { setCurrentInfoSection, setCurrentSection } from '../../actions/sectionActions';

class SectionContainer extends PureComponent {

    constructor(props) {
        super(props);

        this.sectionId = null;
    }

    componentDidMount() {
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
                });
        }
    }

    componentWillUnmount() {
        if (this.sectionId) {
            this.props.leaveRoom(this.sectionId);
        }
        this.props.resetCurrentSection();  //?
    }
    
    render() {
        //console.log('render SectionContainer');
        debugger;
        return (
            <Section
                section = {this.props.currentSection}
                isCurrent = {true}
                setCurrentInfoSection = {this.props.setCurrentInfoSection}

                currentInfoSubSection = {this.props.currentInfoSubSection}
                modifiableSubSection = {this.props.modifiableSubSection}
                setCurrentInfoSubSection = {this.props.setCurrentInfoSubSection}
                setModifiableSubSection = {this.props.setModifiableSubSection}
                modifySubSection = {this.props.modifySubSection}
                deleteSubSection = {this.props.deleteSubSection}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        currentSection: store.sectionState.get('currentSection'),
        currentInfoSubSection: store.subSectionState.get('currentInfoSubSection'),
        modifiableSubSection: store.subSectionState.get('modifiableSubSection'),
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        setCurrentInfoSection: function(item) {
            dispatch(setCurrentInfoSection(item));
        },
        modifySubSection: function(item) {
            subSectionApi.modifySubSection(item);
        },
        deleteSubSection: function(item) {
            subSectionApi.deleteSubSection(item);
        },
        setModifiableSubSection: function(item) {
            dispatch(subSectionActions.setModifiableSubSection(item));
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
        joinRoom: function(id) {
            dispatch(joinRoom(id));
        },
        leaveRoom: function(id) {
            dispatch(leaveRoom(id));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionContainer);