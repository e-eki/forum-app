'use strict';

import React, { PureComponent } from 'react';

// уведомление о новых сообщениях
export default class NewMessagesNotificationForm extends PureComponent {

	constructor(props) {
		super(props);
	}

	render() {
		const className = 'notification-form ' + (this.props.className ? this.props.className : '');

		debugger;
		let description;

		switch (this.props.newMessagesCount) {
			case 1:
				description = 'новое';
				break;

			default:
				description = 'новых';
				break;
		}

		return (
			<div className = {className}>

				{this.props.newMessagesCount} {description}

			</div>
		)
	}
}