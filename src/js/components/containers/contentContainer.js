'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Content from '../views/content';
import { getAllSections } from '../../api/sectionApi';
import * as actions from '../../actions/actions';

// const mapStateToProps = function(state) {
//     debugger;
//     return {
//         sections: state.get('sections')
//     };
// }

// export default connect(mapStateToProps, actions)(Content);

class ContentContainer extends Component {

    componentDidMount() {
        debugger;
        
        getAllSections();
    }
    
    render() {
        return (
          <Content sections = {this.props.sections} />
        );
    }
}

const mapStateToProps = function(state) {
    return {
        sections: state.get('sections')
    };
}

export default connect(mapStateToProps, actions)(ContentContainer);