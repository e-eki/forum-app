'use strict';

import React, { Component } from 'react';

export default class Footer extends Component {

    render() {
        console.log('render footer');
        const className = 'footer ' + (this.props.className ? this.props.className : '');
        
        return (
            <div className = {className}>
                 <div className ="footer__title">
                    &#169; В. А. Дремина, 2018
                </div>
            </div>
        )
    }
}