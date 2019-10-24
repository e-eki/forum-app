'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Section from '../views/section';
import * as actions from '../../actions/actions';

class SectionContainer extends Component {

    componentDidMount() {
        debugger;
        const id = this.props.match.params.id;
    }
    
    render() {
        return (
          <Section {...this.props.data} />
        );
    }
}

const mapStateToProps = function(state) {
    debugger;
    return {
        data: state.get('currentSection')
    };
}

export default connect(mapStateToProps, actions)(SectionContainer);