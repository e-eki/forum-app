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

        const birthDate = this.props.userInfo.birthDate;
        let birthDateString;

        if (birthDate) {
            birthDateString = (typeof(birthDate) === 'string') ? new Date(birthDate).toDateString() : birthDate.toDateString();
        }

        //todo: вынести все относительные пути в отдельный файл!
        
        return (
            <div className = {className}>
                <div>USER</div>
                <div>{this.props.userInfo.nickName}</div>
                {this.props.userInfo.name ? <div>{this.props.userInfo.name}</div> : null}
                {birthDateString}
                {this.props.userInfo.city ? <div>{this.props.userInfo.city}</div> : null}
                {this.props.userInfo.profession ? <div>{this.props.userInfo.profession}</div> : null}
                {this.props.userInfo.hobby ? <div>{this.props.userInfo.hobby}</div> : null}
                {this.props.userInfo.citation ? <div>{this.props.userInfo.citation}</div> : null}
                
                {!this.props.isPrivateChannel && this.props.userInfo.id
                    ?
                    <Link to={`/private-channels/?recipientId=${this.props.userInfo.id}`}>
                        <button className = ''>Написать личное сообщение</button>
                    </Link>
                    :
                    null
                }

                <button className = '' onClick = {this.props.resetCurrentUserInfo}>
                    Закрыть
                </button>
            </div>
        )
    }
}
