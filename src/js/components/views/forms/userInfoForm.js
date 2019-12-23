'use strict';

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import appConst from '../../../constants/appConst';

// Форма с информацией о юзере
export default class UserInfoForm extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        //console.log('render UserInfoForm');
        const className = 'user-info ' + (this.props.className ? this.props.className : '');

        debugger;

        let userInfoBlock = <div></div>;

        if (this.props.userInfo) {
            const birthDate = this.props.userInfo.birthDate;
            let birthDateString;

            if (birthDate) {
                birthDateString = (typeof(birthDate) === 'string') ? new Date(birthDate).toDateString() : birthDate.toDateString();
            }

            userInfoBlock = <div>
                                <div>USER</div>
                                <div>{this.props.userInfo.login}</div>
                                {this.props.userInfo.name ? <div>{this.props.userInfo.name}</div> : null}
                                {birthDateString}
                                {this.props.userInfo.city ? <div>{this.props.userInfo.city}</div> : null}
                                {this.props.userInfo.profession ? <div>{this.props.userInfo.profession}</div> : null}
                                {this.props.userInfo.hobby ? <div>{this.props.userInfo.hobby}</div> : null}
                                {this.props.userInfo.captionText ? <div>{this.props.userInfo.captionText}</div> : null}
                                
                                {/* {!this.props.isPrivateChannel && this.props.userInfo.id
                                    ?
                                    <Link to={`${appConst.privateChannelsLink}/?recipientId=${this.props.userInfo.id}`}>
                                        <button className = ''>Написать личное сообщение</button>
                                    </Link>
                                    :
                                    null
                                } */}

                                <Link to={`${appConst.privateChannelsLink}/?recipientId=${this.props.userInfo.id}`}>
                                    <button className = ''>Написать личное сообщение</button>
                                </Link>

                                <button className = '' onClick = {this.props.resetCurrentUserInfo}>
                                    Закрыть
                                </button> 
                            </div>
        }

        
        
        return (
            <div className = {className}>
                {userInfoBlock}
            </div>
        )
    }
}
