'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Main from '../views/main';
import * as sectionApi from '../../api/sectionApi';
import * as subSectionApi from '../../api/subSectionApi';
import * as sectionActions from '../../actions/sectionActions';
import * as subSectionActions from '../../actions/subSectionActions';
import { joinRoom, leaveRoom, deleteSubSectionById } from '../../actions/remoteActions';
import apiConst from '../../constants/apiConst';
import { setParentItemsList } from '../../actions/modifyingActions';

// const mapStateToProps = function(state) {
//     debugger;
//     return {
//         sections: state.get('sections')
//     };
// }

// export default connect(mapStateToProps, actions)(Content);

class MainContainer extends PureComponent {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        debugger;
        return sectionApi.getSections()
            .then(sections => {
                if (sections) {
                    this.props.setSections(sections);
                }

                this.props.joinRoom(apiConst.defaultRoomId);
                
                return true;
            });
    }

    componentWillUnmount() {
        this.props.leaveRoom(apiConst.defaultRoomId);

        this.props.resetSections();
    }

    componentDidUpdate() {
        debugger;

        if (this.props.movingSection || this.props.movingSubSection) {   //?
            this.props.setParentItemsList(this.props.sections);
        }
    }
    
    render() {
        //console.log('render MainContainer');
        return (
            <Main  
                sections = {this.props.sections}
                currentInfoSection = {this.props.currentInfoSection}
                setCurrentInfoSection = {this.props.setCurrentInfoSection}
                modifiableSection = {this.props.modifiableSection}
                movingSection = {this.props.movingSection}
                setModifiableSection = {this.props.setModifiableSection}
                setMovingSection = {this.props.setMovingSection}
                modifySection = {sectionApi.modifySection}
                deleteSection = {sectionApi.deleteSection}

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
        sections: store.sectionState.get('sections'),
        currentInfoSection: store.sectionState.get('currentInfoSection'),
        modifiableSection: store.sectionState.get('modifiableSection'),
        movingSection: store.sectionState.get('movingSection'),
        currentInfoSubSection: store.subSectionState.get('currentInfoSubSection'),
        modifiableSubSection: store.subSectionState.get('modifiableSubSection'),
        movingSubSection: store.subSectionState.get('movingSubSection'),
        parentItemsList: store.modifyingState.get('parentItemsList'),
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        setSections: function(items) {
            dispatch(sectionActions.setSections(items));
        },
        resetSections: function() {
            dispatch(sectionActions.setSections(null));
        },
        // modifySection: function(item) {
        //     sectionApi.modifySection(item);
        // },
        // deleteSection: function(item) {
        //     sectionApi.deleteSection(item);
        // },
        setModifiableSection: function(item) {
            dispatch(sectionActions.setModifiableSection(item));
        },
        setMovingSection: function(item) {
            dispatch(sectionActions.setMovingSection(item));
        },
        setCurrentInfoSection: function(item) {
            dispatch(sectionActions.setCurrentInfoSection(item));
        },
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
        deleteSubSectionById: function(subSectionId, sectionId) {
            dispatch(deleteSubSectionById(subSectionId, sectionId));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);