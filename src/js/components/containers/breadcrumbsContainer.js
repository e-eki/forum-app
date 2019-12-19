'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Breadcrumbs from '../views/breadcrumbs';

class BreadcrumbsContainer extends PureComponent {

    constructor(props) {
        super(props);
    }
    
    render() {
        debugger;
        let breadcrumbs = null;

        if (this.props.currentSection ||
            this.props.currentSubSection ||
            this.props.currentChannel) {
                breadcrumbs = <Breadcrumbs
                                    currentSection = {this.props.currentSection}
                                    currentSubSection = {this.props.currentSubSection}
                                    currentChannel = {this.props.currentChannel}
                                />;
            }

        return (
            <div>{breadcrumbs}</div>
        );
    }
}

const mapStateToProps = function(store) {
    return {
        currentSection: store.sectionState.get('currentSection'),
        currentSubSection: store.subSectionState.get('currentSubSection'),
        currentChannel: store.channelState.get('currentChannel'),
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        //?
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BreadcrumbsContainer);