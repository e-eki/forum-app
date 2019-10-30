'use strict';

import React, { PureComponent } from 'react';

export default class QuotesBar extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        console.log('render quotesBar');
        const className = 'quotes-bar ' + (this.props.className ? this.props.className : '');
        
        return (
            <div className = {className}>
                <div>Quotesbar</div>
            </div>
        )
    }
}