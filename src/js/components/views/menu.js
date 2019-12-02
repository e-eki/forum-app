'use strict';

import React, { PureComponent } from 'react';
import SearchForm from './forms/searchForm';

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

                <SearchForm/>
            </div>
        )
    }
}