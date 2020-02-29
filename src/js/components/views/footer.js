'use strict';

import React, { PureComponent } from 'react';
import forumConst from '../../constants/forumConst';

// футер
export default class Footer extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        const className = 'footer ' + (this.props.className ? this.props.className : '');

        const mailLink = `mailto:${forumConst.forumEmail}`;
        
        return (
            <div className = {className}>
                <div className ="footer__title">
                    По всем вопросам: <a href={mailLink}>{forumConst.forumEmail}</a>
                </div>

                <div className ="footer__title">
                    &#169; В. А. Дремина, 2020
                </div>
            </div>
        )
    }
}