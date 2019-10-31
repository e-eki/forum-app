'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import SubSection from '../views/subSection';
import { getSubSectionById } from '../../api/subSectionApi';

class SubSectionContainer extends PureComponent {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        debugger;
        if (this.props.match && this.props.match.params) {
            const id = this.props.match.params.id;
            getSubSectionById(id);
        }
    }
    
    render() {
        console.log('render SubSectionContainer');
        return (
          <SubSection subSection = {this.props.data} isCurrent = {true} />
        );
    }
}

const mapStateToProps = function(state) {
    debugger;
    return {
        data: state.get('currentSubSection')
    };
}

export default connect(mapStateToProps)(SubSectionContainer);