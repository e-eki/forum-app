'use strict';

import React, { Component } from 'react';

// Форма для создания/редактирования раздела
export default class ModifyForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: this.props.modifiableItem.name,
            description: this.props.modifiableItem.description,
        }

        this.changeData = this.changeData.bind(this);
        this.modifyItem = this.modifyItem.bind(this);
        this.resetModifiableItem = this.resetModifiableItem.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        debugger;
        return true; //??
    }

    // ввод данных
	changeData(event) {
        debugger;
		const dataName = event.target.name;

		this.state[`${dataName}`] = event.target.value;
		this.setState({});
    }
    
    modifyItem() {
        debugger;
        this.props.modifiableItem.name = this.state.name;
        this.props.modifiableItem.description = this.state.description;

        this.props.modifyItem(this.props.modifiableItem);
    }

    resetModifiableItem() {
        debugger;
        this.props.setModifiableItem(null);
    }

    render() {
        console.log('render modifyForm');
        const className = 'modify-form ' + (this.props.className ? this.props.className : '');

        debugger;

        const modifyingHeader = this.props.modifiableItem.id
                                ?
                                <div>Редактирование</div>
                                :
                                <div>Добавление</div>;
        
        return (
            <div className = {className}>
                {modifyingHeader}

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
