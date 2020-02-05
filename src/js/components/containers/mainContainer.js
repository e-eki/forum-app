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
import * as baseUtils from '../../utils/baseUtils';

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

        this.canAdd = false;

        this.getSections = this.getSections.bind(this);
    }

    componentDidMount() {
        return this.getSections();
    }

    componentWillUnmount() {
        this.props.leaveRoom(apiConst.defaultRoomId);

        this.props.resetSections();
        this.props.setParentItemsList(null);
    }

    componentDidUpdate(prevProps) {
        if ((this.props.movingSection || this.props.movingSubSection) &&
            !this.props.parentItemsList) {
                this.props.setParentItemsList(this.props.sections || []);
        }

        // если изменились данные токенов, могли измениться доступные элементы управления, перерисоваем изменившиеся
        if (this.props.accessToken !== prevProps.accessToken ||
            this.props.userRole !== prevProps.userRole) {
                debugger;
                return this.getSections();
        }
    }

    getSections() {
        return sectionApi.getSections()
            .then(sections => {
                if (sections) {
                    this.canAdd = sections.canAdd || false;

                    this.props.setSections(sections.items || []);
                }

                this.props.joinRoom(apiConst.defaultRoomId);
                
                return true;
            })
            .catch(error => {
                baseUtils.showErrorMessage(error);
                return false;
            })
    }
    
    render() {
        //console.log('render MainContainer');
        return (
            <Main
                canAdd = {this.canAdd}
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

        accessToken: store.authState.get('accessToken'),
        userRole: store.authState.get('userRole'),
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

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);