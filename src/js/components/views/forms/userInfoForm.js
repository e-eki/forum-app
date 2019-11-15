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
        
        return (
            <div className = {className}>
                <div>USER</div>
                <div>{this.props.userInfo.nickName}</div>
                {this.props.userInfo.name ? <div>{this.props.userInfo.name}</div> : null}
                {this.props.userInfo.birthDate ? <div>this.props.userInfo.birthDate.toDateString()</div> : null}
                {this.props.userInfo.city ? <div>{this.props.userInfo.city}</div> : null}
                {this.props.userInfo.profession ? <div>{this.props.userInfo.profession}</div> : null}
                {this.props.userInfo.hobby ? <div>{this.props.userInfo.hobby}</div> : null}
                {this.props.userInfo.citation ? <div>{this.props.userInfo.citation}</div> : null}
                
                {this.props.currentUserChannel
                    ?
                    null
                    :
                    <Link to={`/userChannels/${this.props.userInfo.id}`}>
                        <button className = ''>Написать личное сообщение</button>
                    </Link>
                }

                <button className = '' onClick = {this.props.resetUserInfo}>
                    Закрыть
                </button>
            </div>
        )
    }
}
