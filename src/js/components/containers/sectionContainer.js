'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Section from '../views/section';
import { getSectionById } from '../../api/sectionApi';
import * as subSectionApi from '../../api/subSectionApi';
import { setModifiableSubSection, setCurrentInfoSubSection, setCurrentSubSection } from '../../actions/subSectionActions';
import { joinRoom, leaveRoom } from '../../actions/remoteActions';
import { setCurrentSection } from '../../actions/sectionActions';

class SectionContainer extends PureComponent {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        debugger;
        if (this.props.match && this.props.match.params) {
            const id = this.props.match.params.id;
            return getSectionById(id)
                .then(section => {
                    debugger;
                    //this.props.setCurrentSection(section);
                    this.props.joinRoom(section.id);

                    return true;
                });
        }
    }

    componentWillUnmount() {
        debugger;
        this.props.leaveRoom(this.props.currentSection.id);
    }
    
    render() {
        console.log('render SectionContainer');
        return (
            <Section
                section = {this.props.currentSection}
                isCurrent = {true}

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

const mapStateToProps = function(state) {
    return {
        currentSection: state.get('currentSection'),
        currentInfoSubSection: state.get('currentInfoSubSection'),
        modifiableSubSection: state.get('modifiableSubSection'),
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        modifySubSection: function(item) {
            subSectionApi.modifySubSection(item);
        },
        deleteSubSection: function(item) {
            subSectionApi.deleteSubSection(item);
        },
        setModifiableSubSection: function(item) {
            dispatch(setModifiableSubSection(item));
        },
        setCurrentInfoSubSection: function(item) {
            dispatch(setCurrentInfoSubSection(item));
        },
        // setCurrentSection: function(item) {
        //     dispatch(setCurrentSection(item));
        // },
        joinRoom: function(id) {
            dispatch(joinRoom(id));
        },
        leaveRoom: function(id) {
            dispatch(leaveRoom(id));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionContainer);