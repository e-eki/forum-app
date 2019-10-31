'use strict';

import React, { Component } from 'react';

// Форма для создания/редактирования раздела
export default class SectionModifyForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: this.props.modifiableSection.name,
            description: this.props.modifiableSection.description,
        }

        this.changeData = this.changeData.bind(this);
        this.modifySection = this.modifySection.bind(this);
        this.resetModifiableSection = this.resetModifiableSection.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        debugger;

        return true; //??
    }

    // ввод данных юзером
	changeData(event) {
        debugger;
		const dataName = event.target.name;

		this.state[`${dataName}`] = event.target.value;
		this.setState({});
    }
    
    modifySection() {
        debugger;
        this.props.modifiableSection.name = this.state.name;
        this.props.modifiableSection.description = this.state.description;

        this.props.modifySection(this.props.modifiableSection);
    }

    resetModifiableSection() {
        debugger;
        this.props.setModifiableSection(null);
    }

    render() {
        console.log('render SectionControlForm');
        const className = 'section ' + (this.props.className ? this.props.className : '');

        debugger;

        const modifyingHeader = this.props.modifiableSection.id
                                ?
                                <div>Редактирование раздела</div>
                                :
                                <div>Создание нового раздела</div>;
        
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

                <button className = '' onClick = {this.modifySection}>
                    Ок
                </button>

                <button className = '' onClick = {this.resetModifiableSection}>
                    Закрыть
                </button>
            </div>
        )
    }
}
