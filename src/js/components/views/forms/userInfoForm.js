'use strict';

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import appConst from '../../../constants/appConst';
import forumConst from '../../../constants/forumConst';
import ModifyForm from './modifyForm';
import PopupForm from './popupForm';

// форма с информацией о юзере
export default class UserInfoForm extends PureComponent {

    constructor(props) {
        super(props);

        this.editUserInfo =this.editUserInfo.bind(this);
        this.resetUserInfo = this.resetUserInfo.bind(this);
    }

    // открыть информацию юзера для редактирования
    editUserInfo() {
        this.props.setModifiableUserInfo(this.props.userInfo);
    }

    // закрыть информацию юзера
    resetUserInfo() {
        // закрываем форму редактирования, если она открыта
        if (this.props.modifiableUserInfo) {
            this.props.setModifiableUserInfo(null);
        }

        this.props.resetCurrentUserInfo();
    }

    render() {
        debugger;
        const className = 'user-info ' + (this.props.className ? this.props.className : '');
        
        let modifyingBlock = null;

        // если информация юзера была назначена редактируемой и есть права на ее редактирование
        if (this.props.modifiableUserInfo &&
            (this.props.userInfo &&
            (this.props.userInfo.canEdit || this.props.userInfo.canEditRole || this.props.userInfo.canEditBlackList))) {
                modifyingBlock = <ModifyForm
                                    modifiableItem = {this.props.modifiableUserInfo}
                                    setModifiableItem = {this.props.setModifiableUserInfo}
                                    modifyItem = {this.props.modifyUserInfo}
                                    type = {forumConst.itemTypes.userInfo}
                                    popupType = {forumConst.popupTypes.modifying}
                                    colorTheme = {this.props.colorTheme}
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

            const privateMessageBlock = (!userInfo.isOwnInfo &&
                                        userInfo.canAddPrivateChannel)
                                            ?
                                            <div className = 'popup-form__item'>
                                                <Link to={`${appConst.privateChannelsLink}/?recipientId=${this.props.userInfo.userId}`}>
                                                    <button className = ''>Написать личное сообщение</button>
                                                </Link>
                                            </div>
                                            :
                                            null;

            const editBlock = (userInfo.canEdit || userInfo.canEditRole || userInfo.canEditBlackList)
                                    ?
                                    <button className = '' onClick = {this.editUserInfo}>
                                        Редактировать
                                    </button>
                                    :
                                    null;

            userInfoBlock = <div>
                                <div className = 'popup-form__title'>{userInfo.login}</div>

                                <div className = 'popup-form__item'>{userInfo.role}</div>

                                {userInfo.inBlackList ? <div className = 'popup-form__item'>В чёрном списке</div> : null}
                                
                                {userInfo.name ? <div className = 'popup-form__item'>Имя: {userInfo.name}</div> : null}
                                {birthDateString ? <div className = 'popup-form__item'>Дата рождения: {birthDateString}</div> : null}
                                {userInfo.city ? <div className = 'popup-form__item'>Город: {userInfo.city}</div> : null}
                                {userInfo.profession ? <div className = 'popup-form__item'>Профессия: {userInfo.profession}</div> : null}
                                {userInfo.hobby ? <div className = 'popup-form__item'>Хобби: {userInfo.hobby}</div> : null}
                                {userInfo.captionText ? <div className = 'popup-form__item'>Подпись: {userInfo.captionText}</div> : null}
                                
                                {privateMessageBlock}

                                <div className = 'popup-form__buttons-block'>
                                    {editBlock}

                                    <button className = '' onClick = {this.resetUserInfo}>
                                        Закрыть
                                    </button>
                                </div>
                            </div>
        }

        const data = <div className = {className}>
                        {modifyingBlock}

                        {userInfoBlock}
                    </div>;

        return (
            <PopupForm
                data = {data}
                colorTheme = {this.props.colorTheme}
                popupType = {forumConst.popupTypes.userInfo}
            />
        )
    }
}
