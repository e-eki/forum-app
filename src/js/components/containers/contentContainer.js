'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Content from '../views/content';
import { getAllSections, modifySection } from '../../api/sectionApi';
import { setModifiableSection } from '../../actions/sectionActions';
import * as actions from '../../actions/channelActions';

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
        getAllSections();
    }
    
    render() {
        console.log('render ContentContainer');
        return (
            <Content
                sections = {this.props.sections}
                modifiableSection = {this.props.modifiableSection}
                setModifiableSection = {this.props.setModifiableSection}
                modifySection = {this.props.modifySection}
            />
        );
    }
}

const mapStateToProps = function(state) {
    debugger;
    return {
        sections: state.get('sections'),
        modifiableSection: state.get('modifiableSection'),  //??
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        modifySection: function(section) {
            modifySection(section);
        },
        setModifiableSection: function(section) {
            dispatch(setModifiableSection(section));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentContainer);