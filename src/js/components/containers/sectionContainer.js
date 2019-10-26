'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Section from '../views/section';
import { getSectionById } from '../../api/sectionApi';

class SectionContainer extends PureComponent {

    // constructor(props) {
    //     super(props);

    //     //this.isCurrent = true;
    // }

    componentDidMount() {
        debugger;
        if (this.props.match && this.props.match.params) {
            const id = this.props.match.params.id;
            getSectionById(id);
        }
    }
    
    render() {
        console.log('render SectionContainer');
        return (
          <Section data = {this.props.data} isCurrent = {true} />
        );
    }
}

const mapStateToProps = function(state) {
    debugger;
    return {
        data: state.get('currentSection')
    };
}

export default connect(mapStateToProps)(SectionContainer);