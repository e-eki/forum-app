'use strict';

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import appConst from '../../../constants/appConst';
import forumConst from '../../../constants/forumConst';
import ModifyForm from './modifyForm';

// Форма с информацией о юзере
export default class UserInfoForm extends PureComponent {

    constructor(props) {
        super(props);

        this.editUserInfo  =this.editUserInfo.bind(this);
    }

    editUserInfo() {
        debugger;
        this.props.setModifiableUserInfo(this.props.userInfo);
    }

    render() {
        //console.log('render UserInfoForm');
        const className = 'user-info ' + (this.props.className ? this.props.className : '');

        debugger;
        let modifyingBlock = null;

        if (this.props.modifiableItem) {
            modifyingBlock = <ModifyForm
                                modifiableItem = {this.props.modifiableUserInfo}
                                setModifiableItem = {this.props.setModifiableUserInfo}
                                modifyItem = {this.props.modifyUserInfo}
                                type = {forumConst.itemTypes.userInfo}
                            />;
        }

        let userInfoBlock = <div></div>;

        if (this.props.userInfo) {
            const userInfo = this.props.userInfo;

            const birthDate = userInfo.birthDate;
            let birthDateString;

            if (birthDate) {
                birthDateString = (typeof(birthDate) === 'string') ? new Date(birthDate).toDateString() : birthDate.toDateString();
            }

            const privateMessageBlock = !userInfo.isOwnInfo
                                            ?
                                            <Link to={`${appConst.privateChannelsLink}/?recipientId=${this.props.userInfo.id}`}>
                                                <button className = ''>Написать личное сообщение</button>
                                            </Link>
                                            :
                                            null;

            const editBlock = userInfo.isOwnInfo
                                ?
                                <button className = '' onClick = {this.editItem}>
                                    Редактировать
                                </button>
                                :
                                null;

            // const roleBlock = userInfo.shownForManageRole
            //                     ?
            //                     <div>
            //                         <button className = '' onClick = {this.props.}>
            //                             Внести в черный список
            //                         </button>

            //                         <button className = '' onClick = {this.editItem}>
            //                             Назначить модератором
            //                         </button>
            //                     </div>

            userInfoBlock = <div>
                                <div>USER</div>
                                <div>{userInfo.login}</div>
                                {userInfo.name ? <div>{userInfo.name}</div> : null}
                                {birthDateString}
                                {userInfo.city ? <div>{userInfo.city}</div> : null}
                                {userInfo.profession ? <div>{userInfo.profession}</div> : null}
                                {userInfo.hobby ? <div>{userInfo.hobby}</div> : null}
                                {userInfo.captionText ? <div>{userInfo.captionText}</div> : null}
                                
                                {privateMessageBlock}

                                {editBlock}

                                <button className = '' onClick = {this.props.resetCurrentUserInfo}>
                                    Закрыть
                                </button> 
                            </div>
        }

        return (
            <div className = {className}>
                {modifyingBlock}

                {userInfoBlock}
            </div>
        )
    }
}
