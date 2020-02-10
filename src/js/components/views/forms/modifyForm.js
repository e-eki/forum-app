'use strict';

import React, { Component } from 'react';
import Promise from 'bluebird';
import forumConst from '../../../constants/forumConst';
import * as baseUtils from '../../../utils/baseUtils';
import { getDateStringForInput } from '../../../utils/dateUtils';

// Форма для создания/редактирования раздела
export default class ModifyForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: this.props.modifiableItem.name || '',
            description: this.props.modifiableItem.description || '',
            text: this.props.modifiableItem.text || '',  //?
            birthDate: this.props.modifiableItem.birthDate ? getDateStringForInput(this.props.modifiableItem.birthDate) : null,
            city: this.props.modifiableItem.city || '',
            profession: this.props.modifiableItem.profession || '',
            hobby: this.props.modifiableItem.hobby || '',
            captionText: this.props.modifiableItem.captionText || '',
            role: this.props.modifiableItem.role || null,
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

    initItemInputs() {
        let itemInputs;      

        if (this.props.type) {
            switch (this.props.type) {

                case forumConst.itemTypes.message:
                    itemInputs = <div>
                                    Текст сообщения
                                    <input 
                                        name = "text"
                                        type="text" 
                                        className = '' 
                                        maxLength = '5000'
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

                    itemInputs = <div>
                                    {this.props.modifiableItem.canEditRole
                                        ?
                                        <div>
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
                                        <div>
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
                                            <div>
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
                                            
                                            <div>
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

                                            <div>
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

                                            <div>
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
                                            
                                            <div>
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
                                            
                                            <div>
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
                    
                default:
                    itemInputs = <div>

                                    Название
                                    <input 
                                        name = "name"
                                        type="text" 
                                        className = '' 
                                        maxLength = '200'
                                        value = {this.state.name}
                                        onChange = {this.changeData}
                                    />

                                    Описание
                                    <input 
                                        name = "description"
                                        type="text" 
                                        className = '' 
                                        maxLength = '500'
                                        value = {this.state.description}
                                        onChange = {this.changeData}
                                    />
                                </div>;

                    break;
            }
        }

        return itemInputs;
    }

    // ввод данных
	changeData(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }
    
    modifyItem() {
        const modifiableItem = this.props.modifiableItem;

        if (this.props.type) {
            switch (this.props.type) {

                case forumConst.itemTypes.message:
                    modifiableItem.text = this.state.text;
                    break;

                case forumConst.itemTypes.userInfo:
                    modifiableItem.role = this.state.role;
                    modifiableItem.inBlackList = (this.state.inBlackList ? true : false);  //т.к. значения 'on'/'off'

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

    resetModifiableItem() {
        this.props.setModifiableItem(null);
    }

    render() {
        //console.log('render modifyForm');
        const className = 'modify-form ' + (this.props.className ? this.props.className : '');

        debugger;

        const itemInputs = this.initItemInputs();

        const modifyingHeader = this.props.modifiableItem.id
                                ?
                                <div>Редактирование</div>
                                :
                                <div>Добавление</div>;
        
        return (
            <div className = {className}>
                {modifyingHeader}

                {itemInputs}

                <button className = '' onClick = {this.modifyItem}>
                    Ок
                </button>

                <button className = '' onClick = {this.resetModifiableItem}>
                    Закрыть
                </button>
            </div>
        )
    }
}
