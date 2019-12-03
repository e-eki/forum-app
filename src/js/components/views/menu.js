'use strict';

import React, { PureComponent } from 'react';

export default class Menu extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        //console.log('render menu');
        const className = 'menu ' + (this.props.className ? this.props.className : '');
        
        return (
            <div className = {className}>
                <div>Menu</div>
            </div>
        )
    }
}