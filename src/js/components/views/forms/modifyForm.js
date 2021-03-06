'use strict';

import React, { Component } from 'react';
import Promise from 'bluebird';
import forumConst from '../../../constants/forumConst';
import * as baseUtils from '../../../utils/baseUtils';
import { getDateStringForInput } from '../../../utils/dateStringUtils';
import PopupForm from './popupForm';

// Форма для создания/редактирования элемента
export default class ModifyForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // наименование/имя-фамилия
            name: this.props.modifiableItem.name || '',
            // описание
            description: this.props.modifiableItem.description || '',
            // текст
            text: this.props.modifiableItem.text || '',
            // дата рождения
            birthDate: this.props.modifiableItem.birthDate ? getDateStringForInput(this.props.modifiableItem.birthDate) : '',
            // город
            city: this.props.modifiableItem.city || '',
            // профессия
            profession: this.props.modifiableItem.profession || '',
            // хобби
            hobby: this.props.modifiableItem.hobby || '',
            // подпись под аватаром
            captionText: this.props.modifiableItem.captionText || '',
            // роль юзера
            role: this.props.modifiableItem.role || null,
            // находится ли юзер в черном списке форума
            inBlackList: this.props.modifiableItem.inBlackList || false,
        }

        this.changeData = this.changeData.bind(this);
        this.modifyItem = this.modifyItem.bind(this);
        this.resetModifiableItem = this.resetModifiableItem.bind(this);
        this.initItemInputs = this.initItemInputs.bind(this);
        this.getRoleOptions = this.getRoleOptions.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true; //todo??
    }

    // получить список ролей юзера для выпадайки
    getRoleOptions() {
        const options = [];
        let i = 0;

        options.push(<option
                        key={i++}
                        value={forumConst.userRoles.admin}
                    >
                        {forumConst.userRoles.admin}
                    </option>);

        options.push(<option
                        key={i++}
                        value={forumConst.userRoles.moderator}
                    >
                        {forumConst.userRoles.moderator}
                    </option>);

        options.push(<option
                        key={i++}
                        value={forumConst.userRoles.user}
                    >
                        {forumConst.userRoles.user}
                    </option>);

        // forumConst.userRoles.forEach(item => {
        //     options.push(<option
        //                     key={i++}
        //                     value={item}
        //                 >
        //                     {item}
        //                 </option>);
        // })
        
        return options;
    }

    // создание полей ввода с информацией элемента
    initItemInputs() {
        let itemInputs;      

        if (this.props.type) {
            switch (this.props.type) {

                case forumConst.itemTypes.message:
                    itemInputs = <div className = 'popup-form__message-input'>
                                    {/* Текст сообщения */}
                                    {/* <input 
                                        name = "text"
                                        type="text" 
                                        className = '' 
                                        maxLength = '5000'
                                        value = {this.state.text}
                                        onChange = {this.changeData}
                                    /> */}
                                    <textarea
                                        name = "text"
                                        className = '' 
                                        maxLength = '10000'
                                        value = {this.state.text}
                                        onChange = {this.changeData}
                                    />
                                </div>;
                    break;

                case forumConst.itemTypes.userInfo:                   
                    let roleOptions;

                    if (this.props.modifiableItem.canEditRole) {
                        roleOptions = this.getRoleOptions();
                    }

                    // если есть права редактировать роль юзера, то доступна выпадайка с ролями
                    // если есть права редактировать черный список форума, то доступен чекбокс с ЧС
                    // если юзер смотрит свою собственную информацию, то у него есть права редактировать все остальные поля
                    itemInputs = <div>
                                    {this.props.modifiableItem.canEditRole
                                        ?
                                        <div className = 'popup-form__item'>
                                            Изменить роль пользователя 
                                            <select
                                                name="role"
                                                className = ''
                                                onChange = {this.changeData}
                                                value = {this.state.role}
                                            >
                                                {roleOptions}
                                            </select>
                                        </div>
                                        :
                                        null
                                    }

                                    {this.props.modifiableItem.canEditBlackList
                                        ?
                                        <div className = 'popup-form__item'>
                                            <input
                                                name = "inBlackList"
                                                type="checkbox"
                                                checked = {this.state.inBlackList}
                                                onChange = {this.changeData}
                                            />
                                            В чёрном списке
                                        </div>
                                        :
                                        null
                                    }

                                    {this.props.modifiableItem.isOwnInfo
                                        ?
                                        <div>
                                            <div className = 'popup-form__item'>
                                                Имя - фамилия
                                                <input 
                                                    name = "name"
                                                    type="text" 
                                                    className = '' 
                                                    maxLength = '50'
                                                    value = {this.state.name}
                                                    onChange = {this.changeData}
                                                />
                                            </div>
                                            
                                            <div className = 'popup-form__item'>
                                                Дата рождения
                                                <input 
                                                    name = "birthDate"
                                                    type="date" 
                                                    className = '' 
                                                    min="1900-01-01"
                                                    max="2019-01-01"
                                                    value = {this.state.birthDate}
                                                    onChange = {this.changeData}
                                                />
                                            </div>

                                            <div className = 'popup-form__item'>
                                                Город
                                                <input 
                                                    name = "city"
                                                    type="text" 
                                                    className = '' 
                                                    maxLength = '50'
                                                    value = {this.state.city}
                                                    onChange = {this.changeData}
                                                />
                                            </div>

                                            <div className = 'popup-form__item'>
                                                Профессия
                                                <input 
                                                    name = "profession"
                                                    type="text" 
                                                    className = '' 
                                                    maxLength = '200'
                                                    value = {this.state.profession}
                                                    onChange = {this.changeData}
                                                />
                                            </div>
                                            
                                            <div className = 'popup-form__item'>
                                                Хобби
                                                <input 
                                                    name = "hobby"
                                                    type="text" 
                                                    className = '' 
                                                    maxLength = '300'
                                                    value = {this.state.hobby}
                                                    onChange = {this.changeData}
                                                />
                                            </div>
                                            
                                            <div className = 'popup-form__item'>
                                                Подпись под аватаром
                                                <input 
                                                    name = "captionText"
                                                    type="text" 
                                                    className = '' 
                                                    maxLength = '300'
                                                    value = {this.state.captionText}
                                                    onChange = {this.changeData}
                                                />
                                            </div>
                                        </div>
                                        :
                                        null
                                    }
                                    
                                </div>;
                    break;
                    
                // поля для раздела/подраздела/чата
                default:
                    itemInputs = <div>
                                    <div className = 'popup-form__item'>
                                        Название
                                        <input 
                                            name = "name"
                                            type="text" 
                                            className = '' 
                                            maxLength = '200'
                                            value = {this.state.name}
                                            onChange = {this.changeData}
                                        />
                                    </div>

                                    <div className = 'popup-form__item'>
                                        Описание
                                        <input 
                                            name = "description"
                                            type="text" 
                                            className = '' 
                                            maxLength = '500'
                                            value = {this.state.description}
                                            onChange = {this.changeData}
                                        />
                                    </div>
                                </div>;

                    break;
            }
        }

        return itemInputs;
    }

    // ввод данных
	changeData(event) {
        debugger;
        const name = event.target.name;
        let value = event.target.value;

        if (name === 'inBlackList') {
            value = !this.state.inBlackList;
        }

        this.setState({
            [name]: value
        });
    }
    
    // редактировать элемент
    modifyItem() {
        const modifiableItem = this.props.modifiableItem;

        if (this.props.type) {
            switch (this.props.type) {

                case forumConst.itemTypes.message:
                    modifiableItem.text = this.state.text;
                    break;

                case forumConst.itemTypes.userInfo:
                    modifiableItem.role = this.state.role;
                    // modifiableItem.inBlackList = ((this.state.inBlackList === 'on') ? true : false);  //т.к. значения 'on'/'off'
                    modifiableItem.inBlackList = this.state.inBlackList;

                    modifiableItem.name = this.state.name;
                    modifiableItem.birthDate = this.state.birthDate;
                    modifiableItem.city = this.state.city;
                    modifiableItem.profession = this.state.profession;
                    modifiableItem.hobby = this.state.hobby;
                    modifiableItem.captionText = this.state.captionText;
                    break;

                default:
                    modifiableItem.name = this.state.name;
                    modifiableItem.description = this.state.description;
                    break;
            }
        }

        return Promise.resolve(this.props.modifyItem(modifiableItem))
            .then(result => {
                this.resetModifiableItem();
            })
            .catch(error => {
                baseUtils.showErrorMessage(error);
                return false;
            })
    }

    // отмена редактирования элемента
    resetModifiableItem() {
        this.props.setModifiableItem(null);
    }

    render() {
        const className = 'modify-form ' + (this.props.className ? this.props.className : '');

        debugger;

        const itemInputs = this.initItemInputs();

        const modifyingHeader = this.props.modifiableItem.id ? 'Редактирование' : 'Добавление';

        const popupType = this.props.modifiableItem.id ? forumConst.popupTypes.modifying : forumConst.popupTypes.adding;

        const data = <div className = {className}>
                        <div className = 'popup-form__title'>{modifyingHeader}</div>

                        {itemInputs}

                        <div className = 'popup-form__buttons-block'>
                            <button className = '' onClick = {this.modifyItem}>
                                Ок
                            </button>

                            <button className = '' onClick = {this.resetModifiableItem}>
                                Закрыть
                            </button>
                        </div>
                    </div>;
        
        return (
            <PopupForm
                data = {data}
                colorTheme = {this.props.colorTheme}
                popupType = {popupType}
            />
        )
    }
}
