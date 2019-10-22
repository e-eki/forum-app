'use strict';

import { connect } from 'react-redux';
import Content from '../views/content';
import * as actions from '../../actions/actions';

const mapStateToProps = function(store) {
    debugger;
  return {
    sections: store.sections
  };
}

export default connect(mapStateToProps, actions)(Content);