'use strict';

import React, { Component } from 'react';

export default class Section extends Component {

    render() {
        console.log('render section');
        const className = 'section ' + (this.props.className ? this.props.className : '');
        
        return (
            <div className = {className}>
                <div>section</div>
            </div>
        )
    }
}