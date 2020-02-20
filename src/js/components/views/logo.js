'use strict';

import React, { PureComponent } from 'react';

// логотип
export default class Logo extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        const className = 'logo ' + (this.props.className ? this.props.className : '');
        
        return (
            <div className = {className}>
                <div>Logo</div>
            </div>
        )
    }
}