'use strict';

import React, { PureComponent } from 'react';

// Форма с информацией о юзере
export default class UserInfoForm extends PureComponent {

    render() {
        console.log('render UserInfoForm');
        const className = 'user-info ' + (this.props.className ? this.props.className : '');
        
        return (
            <div className = {className}>
                <div>USER</div>
                <div>{this.props.data.date.toLocaleTimeString()}</div>
                <div>{this.props.data.text}</div>
            </div>
        )
    }
}