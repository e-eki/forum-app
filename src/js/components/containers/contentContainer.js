'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Content from '../views/content';
import * as sectionApi from '../../api/sectionApi';
import * as subSectionApi from '../../api/subSectionApi';
import * as sectionActions from '../../actions/sectionActions';
import * as subSectionActions from '../../actions/subSectionActions';
import { joinRoom, leaveRoom } from '../../actions/remoteActions';
import apiConst from '../../constants/apiConst';

// const mapStateToProps = function(state) {
//     debugger;
//     return {
//         sections: state.get('sections')
//     };
// }

// export default connect(mapStateToProps, actions)(Content);

class ContentContainer extends PureComponent {

    constructor(props) {
        super(props);
    }

    componentDidMount() {      
        return sectionApi.getSections()
            .then(sections => {
                //this.props.setSections(sections);

                this.props.joinRoom(apiConst.defaultRoomId);
                return true;
            });
    }

    componentWillUnmount() {
        this.props.leaveRoom(apiConst.defaultRoomId);

        this.props.resetSections();
    }
    
    render() {
        //console.log('render ContentContainer');
        return (
            <Content
                sections = {this.props.sections}
                currentInfoSection = {this.props.currentInfoSection}
                modifiableSection = {this.props.modifiableSection}
                setCurrentInfoSection = {this.props.setCurrentInfoSection}
                setModifiableSection = {this.props.setModifiableSection}
                modifySection = {this.props.modifySection}
                deleteSection = {this.props.deleteSection}

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
        sections: store.sectionState.get('sections'),
        currentInfoSection: store.sectionState.get('currentInfoSection'),
        modifiableSection: store.sectionState.get('modifiableSection'),
        currentInfoSubSection: store.subSectionState.get('currentInfoSubSection'),
        modifiableSubSection: store.subSectionState.get('modifiableSubSection'),
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        resetSections: function() {
            dispatch(sectionActions.setSections(null));
        },
        modifySection: function(item) {
            sectionApi.modifySection(item);
        },
        deleteSection: function(item) {
            sectionApi.deleteSection(item);
        },
        setModifiableSection: function(item) {
            dispatch(sectionActions.setModifiableSection(item));
        },
        setCurrentInfoSection: function(item) {
            dispatch(sectionActions.setCurrentInfoSection(item));
        },

        modifySubSection: function(item) {
            subSectionApi.modifySubSection(item);
        },
        deleteSubSection: function(item) {
            subSectionApi.deleteSubSection(item);  //todo??
        },
        setModifiableSubSection: function(item) {
            dispatch(subSectionActions.setModifiableSubSection(item));
        },
        setCurrentInfoSubSection: function(item) {
            dispatch(subSectionActions.setCurrentInfoSubSection(item));
        },
        joinRoom: function(id) {
            dispatch(joinRoom(id));
        },
        leaveRoom: function(id) {
            dispatch(leaveRoom(id));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentContainer);