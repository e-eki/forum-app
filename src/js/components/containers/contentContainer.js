'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Content from '../views/content';
import * as sectionApi from '../../api/sectionApi';
import * as sectionActions from '../../actions/sectionActions';
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
        debugger;       
        return sectionApi.getAllSections()
            .then(sections => {
                debugger;
                //this.props.setSections(sections);

                this.props.joinRoom(apiConst.defaultRoomId);
                return true;
            });
    }

    componentWillUnmount() {
        debugger;
        this.props.leaveRoom(apiConst.defaultRoomId);
    }
    
    render() {
        console.log('render ContentContainer');
        return (
            <Content
                sections = {this.props.sections}
                currentInfoSection = {this.props.currentInfoSection}
                modifiableSection = {this.props.modifiableSection}
                setCurrentInfoSection = {this.props.setCurrentInfoSection}
                setModifiableSection = {this.props.setModifiableSection}
                modifySection = {this.props.modifySection}
                deleteSection = {this.props.deleteSection}
            />
        );
    }
}

const mapStateToProps = function(state) {
    debugger;
    return {
        sections: state.get('sections'),
        currentInfoSection: state.get('currentInfoSection'),
        modifiableSection: state.get('modifiableSection'),
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
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
        // setSections: function(items) {
        //     dispatch(sectionActions.setSections(items));
        // },
        joinRoom: function(id) {
            dispatch(joinRoom(id));
        },
        leaveRoom: function(id) {
            dispatch(leaveRoom(id));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentContainer);