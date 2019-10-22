'use strict';

import React, { Component } from 'react';
import Logo from './logo';

export default class Header extends Component {

    constructor(props) {
        super(props);

        this.forumName = 'Сферический форум в вакууме';
    }

    render() {
        console.log('render header');
        const className = 'header ' + (this.props.className ? this.props.className : '');
        
        return (
            <div className = {className}>
                <Logo className = 'header__logo '/>

                 <div className = "header__title">
                    <h1>{this.forumName}</h1>
                </div>
            </div>
        )
    }
}