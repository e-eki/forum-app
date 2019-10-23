'use strict';

import { connect } from 'react-redux';
import Content from '../views/content';
import * as actions from '../../actions/actions';

const mapStateToProps = function(state) {
    //debugger;
    return {
        sections: state.get('sections')
    };
}

export default connect(mapStateToProps, actions)(Content);