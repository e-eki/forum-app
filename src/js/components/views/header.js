'use strict';

import React, { PureComponent } from 'react';
import Logo from './logo';

export default class Header extends PureComponent {

    constructor(props) {
        super(props);

        this.forumName = 'Сферический форум в вакууме';
    }

    render() {
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