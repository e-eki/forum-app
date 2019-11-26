'use strict';

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

// Форма с информацией о юзере
export default class UserInfoForm extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        //console.log('render UserInfoForm');
        const className = 'user-info ' + (this.props.className ? this.props.className : '');

        debugger;

        const birthDate = this.props.currentUserInfo.birthDate;
        let birthDateString;

        if (birthDate) {
            birthDateString = (typeof(birthDate) === 'string') ? new Date(birthDate).toDateString() : birthDate.toDateString();
        }
        
        return (
            <div className = {className}>
                <div>USER</div>
                <div>{this.props.currentUserInfo.nickName}</div>
                {this.props.currentUserInfo.name ? <div>{this.props.currentUserInfo.name}</div> : null}
                {birthDateString}
                {this.props.currentUserInfo.city ? <div>{this.props.currentUserInfo.city}</div> : null}
                {this.props.currentUserInfo.profession ? <div>{this.props.currentUserInfo.profession}</div> : null}
                {this.props.currentUserInfo.hobby ? <div>{this.props.currentUserInfo.hobby}</div> : null}
                {this.props.currentUserInfo.citation ? <div>{this.props.currentUserInfo.citation}</div> : null}
                
                {/* {this.props.currentUserChannel
                    ?
                    null
                    :
                    <Link to={`/userChannels/${this.props.userInfo.id}`}>
                        <button className = ''>Написать личное сообщение</button>
                    </Link>
                } */}

                <button className = '' onClick = {this.props.resetCurrentUserInfo}>
                    Закрыть
                </button>
            </div>
        )
    }
}
