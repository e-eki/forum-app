'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Section from '../views/section';
import * as actions from '../../actions/actions';
import { getSectionById } from '../../api/sectionApi';

class SectionContainer extends Component {

    constructor(props) {
        super(props);

        this.isCurrent = false;
    }

    componentWillUpdate() {
        debugger;
        if (this.props.match && this.props.match.params) {
            const id = this.props.match.params.id;
            getSectionById(id);
            this.isCurrent = true;
        }
    }

    componentDidUpdate() {
        debugger;
        if (this.props.match && this.props.match.params) {
            const id = this.props.match.params.id;
            getSectionById(id);
            this.isCurrent = true;
        }
    }
    
    render() {
        return (
          <Section data = {this.props.data} iCurrent = {this.isCurrent} />
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