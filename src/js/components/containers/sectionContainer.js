'use strict';

import { connect } from 'react-redux';
import Section from '../views/section';
import * as actions from '../../actions/actions';

const mapStateToProps = function(state) {
    debugger;
    return {
        data: state.get('currentSection')
    };
}

export default connect(mapStateToProps, actions)(Section);