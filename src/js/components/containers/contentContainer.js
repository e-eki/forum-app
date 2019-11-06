'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Content from '../views/content';
import * as sectionApi from '../../api/sectionApi';
import { setModifiableSection, setCurrentInfoSection } from '../../actions/sectionActions';

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
        sectionApi.getAllSections();
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
            dispatch(setModifiableSection(item));
        },
        setCurrentInfoSection: function(item) {
            dispatch(setCurrentInfoSection(item));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentContainer);