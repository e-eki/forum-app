'use strict';

import { connect } from 'react-redux';
import Content from '../views/content';
import { getAllSections } from '../../api/sectionApi';

// const mapStateToProps = function(state) {
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
          <Content {...this.props.section} />
        );
    }
}

const mapStateToProps = function(state) {
    return {
        sections: state.get('sections')
    };
}

export default connect(mapStateToProps, actions)(ContentContainer);