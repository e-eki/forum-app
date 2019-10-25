'use strict';

import React, { PureComponent } from 'react';

export default class Logo extends PureComponent {

    render() {
        console.log('render logo');
        const className = 'logo ' + (this.props.className ? this.props.className : '');
        
        return (
            <div className = {className}>
                <div>Logo</div>
            </div>
        )
    }
}