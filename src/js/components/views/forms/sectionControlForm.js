'use strict';

import React, { PureComponent } from 'react';

// Форма для создания/редактирования раздела
export default class SectionControlForm extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
        }

        this.changeData = this.changeData.bind(this);
    }

    // ввод данных юзером
	changeData(event) {
        debugger;
		const dataName = event.target.name;

		this.state[`${dataName}Data`] = event.target.value;
		this.setState({});
	}

    render() {
        console.log('render SectionControlForm');
        const className = 'section ' + (this.props.className ? this.props.className : '');

        debugger;
        
        return (
            <div className = {className}>
                <div>NEW SECTION</div>
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

                <button className = '' onClick = {this.props.addSection}>
                    Ок
                </button>

                <button className = '' onClick = {this.props.hideSectionControl}>
                    Закрыть
                </button>
            </div>
        )
    }
}
