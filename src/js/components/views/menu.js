'use strict';

import React, { Component } from 'react';

export default class Menu extends Component {

    render() {
        console.log('render menu');
        const className = 'menu ' + (this.props.className ? this.props.className : '');
        
        return (
            <div className = {className}>
                <div>Menu</div>
            </div>
        )
    }
}