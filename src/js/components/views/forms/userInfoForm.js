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
            let birthDateString = null;

            if (birthDate) {
                birthDateString = (typeof(birthDate) === 'string') ? new Date(birthDate).toDateString() : birthDate.toDateString();
            }

            const privateMessageBlock = (!userInfo.isOwnInfo && !userInfo.inBlackList)
                                            ?
                                            <Link to={`${appConst.privateChannelsLink}/?recipientId=${this.props.userInfo.id}`}>
                                                <button className = ''>Написать личное сообщение</button>
                                            </Link>
                                            :
                                            null;

            const editBlock = ((userInfo.isOwnInfo || userInfo.canEditRole || userInfo.canEditBlackList) &&
                                !userInfo.inBlackList)
                                    ?
                                    <button className = '' onClick = {this.editItem}>
                                        Редактировать
                                    </button>
                                    :
                                    null;

            userInfoBlock = <div>
                                <div>USER</div>

                                <div>{userInfo.role}</div>

                                {userInfo.inBlackList ? <div>В черном списке</div> : null}

                                <div>{userInfo.login}</div>
                                {userInfo.name ? <div>Имя: {userInfo.name}</div> : null}
                                {birthDateString ? <div>Дата рождения: {birthDateString}</div> : null}
                                {userInfo.city ? <div>Город: {userInfo.city}</div> : null}
                                {userInfo.profession ? <div>Профессия: {userInfo.profession}</div> : null}
                                {userInfo.hobby ? <div>Хобби: {userInfo.hobby}</div> : null}
                                {userInfo.captionText ? <div>Подпись: {userInfo.captionText}</div> : null}
                                
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
