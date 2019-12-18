'use strict';

import React, { Component } from 'react';
import Promise from 'bluebird';
import forumConst from '../../../constants/forumConst';

// Форма для создания/редактирования раздела
export default class ModifyForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: this.props.modifiableItem.name || '',
            description: this.props.modifiableItem.description || '',
            text: this.props.modifiableItem.text || '',  //?
        }

        this.changeData = this.changeData.bind(this);
        this.modifyItem = this.modifyItem.bind(this);
        this.resetModifiableItem = this.resetModifiableItem.bind(this);
        this.initItemInputs = this.initItemInputs.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true; //todo??
    }

    initItemInputs() {
        debugger;
        let itemInputs;

        if (this.props.type) {
            switch (this.props.type) {

                case forumConst.itemTypes.message:
                    itemInputs = <div>
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
                    
                default:
                    itemInputs = <div>
                                    <input 
                                        name = "name"
                                        type="text" 
                                        className = '' 
                                        maxLength = '200'
                                        value = {this.state.name}
                                        onChange = {this.changeData}
                                    />

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
        debugger;
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }
    
    modifyItem() {
        debugger;

        if (this.props.type) {
            switch (this.props.type) {

                case forumConst.itemTypes.message:
                    this.props.modifiableItem.text = this.state.text;
                    break;

                default:
                    this.props.modifiableItem.name = this.state.name;
                    this.props.modifiableItem.description = this.state.description;
                    break;
            }
        }

        return Promise.resolve(this.props.modifyItem(this.props.modifiableItem))
            .then(result => {
                this.resetModifiableItem();   //?
            })
    }

    resetModifiableItem() {
        debugger;
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
