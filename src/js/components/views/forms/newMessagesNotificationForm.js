'use strict';

import React, { PureComponent } from 'react';

// уведомление о новых сообщениях
export default class NewMessagesNotificationForm extends PureComponent {

	constructor(props) {
		super(props);
	}

	render() {
		//console.log('--------render NewMessagesNotificationForm--------------');
		const className = 'notification-form ' + (this.props.className ? this.props.className : '');

		debugger;

		return (
			<div className = {className}>

				{this.props.newMessagesCount} новое сообщение

			</div>
		)
	}
}