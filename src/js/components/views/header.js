'use strict';

import React, { PureComponent } from 'react';
import Logo from './logo';
import forumConst from '../../constants/forumConst';

// хэдер
export default class Header extends PureComponent {

    constructor(props) {
        super(props);

        // название форума
        this.forumName = forumConst.forumName;
    }

    render() {
        const className = 'header ' + (this.props.className ? this.props.className : '');
        
        return (
            <div className = {className}>
                <Logo className = 'header__logo '/>

                <div className = "header__title">
                    <h1>{this.forumName}</h1>

                    <div className = "header__note">
                        beta - версия
                    </div>
                </div>
            </div>
        )
    }
}