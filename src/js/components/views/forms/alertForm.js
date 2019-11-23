'use strict';

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

// форма вывода сообщений для юзера
export default class AlertForm extends PureComponent {

	constructor(props) {
		super(props);
	}

	render() {
		//console.log('--------render alertForm--------------');
		const className = 'alert-form ' + (this.props.className ? this.props.className : '');

		let alertBlock = <div></div>;
		debugger;

		if (this.props.alertData) {
			const alertInfo = <div>
									<p>{this.props.alertData.message || 'something crashed!'}</p>

									

									<button className = '' >
										Ok
									</button>
								</div>;

			if (this.props.alertData.link) {
				alertBlock = <Link to = {this.props.alertData.link}>
								{alertInfo}	
							</Link>;
			}
			else {
				alertBlock = alertInfo;
			}
		}

		

		return (
			<div className = {className} onClick = {this.props.resetAlertData}>

				{alertBlock}

			</div>
		)
	}
}