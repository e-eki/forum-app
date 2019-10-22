'use strict';

import React, { Component } from 'react';

// Подраздел
export default class SubSection extends Component {

    render() {
        console.log('render subSection');
        const className = 'sub-section ' + (this.props.className ? this.props.className : '');
        
        return (
            <div className = {className}>
                <div>subSection</div>
            </div>
        )
    }
}