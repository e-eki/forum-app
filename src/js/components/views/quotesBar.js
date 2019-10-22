'use strict';

import React, { Component } from 'react';

export default class QuotesBar extends Component {

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