'use strict';

import React, { PureComponent } from 'react';

// слой, скрывающий основной контент и делающий его неактивным
// в случае, когда показано всплывающее окно
export default class HidingLayer extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        //const className = 'hiding-layer ' + (this.props.className ? this.props.className : '');
        
        return (
            <div className = 'hiding-layer'></div>
        )
    }
}