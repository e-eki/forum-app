'use strict';

import React, { PureComponent } from 'react';
import forumConst from '../../constants/forumConst';

// логотип
export default class Logo extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        const className = 'logo ' + (this.props.className ? this.props.className : '');
        
        return (
            <div className = {className}>
                <img 
                    name = {forumConst.forumName}
                    className = 'logo' 
                    src = '/images/trekking_logo.png' 
                    alt = {forumConst.forumName} 
                    title = {forumConst.forumName}
                >
                </img>
                {/* Logo */}
            </div>
        )
    }
}