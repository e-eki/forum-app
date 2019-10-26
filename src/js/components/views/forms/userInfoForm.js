'use strict';

import React, { PureComponent } from 'react';

// Форма с информацией о юзере
export default class UserInfoForm extends PureComponent {

    render() {
        console.log('render UserInfoForm');
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
                
                {/* <Link to="/login">
					<button className = 'bar__button button button_login'>Вход</button>
				</Link> */}

                <button className = '' onClick = {this.props.hideUserInfo}>
                    Закрыть
                </button>
            </div>
        )
    }
}

// userInfo: {
//     id: 0,
//     nickName: 'First_User',
//     name: 'Qwerty Asdf',
//     birthDate: new Date(),
//     city: 'Moscow',
//     profession: 'engineer',
//     hobby: 'swimming',
//     citation: 'eee vvvv ssss xxxx!',
// }