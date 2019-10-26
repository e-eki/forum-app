'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Content from '../views/content';
import { getAllSections } from '../../api/sectionApi';
import * as actions from '../../actions/channelActions';

// const mapStateToProps = function(state) {
//     debugger;
//     return {
//         sections: state.get('sections')
//     };
// }

// export default connect(mapStateToProps, actions)(Content);

class ContentContainer extends PureComponent {

    componentDidMount() {
        debugger;       
        getAllSections();
    }
    
    render() {
        console.log('render ContentContainer');
        return (
          <Content sections = {this.props.sections} />
        );
    }
}

const mapStateToProps = function(state) {
    debugger;
    return {
        sections: state.get('sections')
    };
}

export default connect(mapStateToProps, actions)(ContentContainer);