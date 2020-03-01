'use strict';

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PopupForm from './popupForm';
import forumConst from '../../../constants/forumConst';

// форма с оповещениями для юзера
export default class AlertForm extends PureComponent {

	constructor(props) {
		super(props);
	}

	render() {
		const className = 'alert-form ' + (this.props.className ? this.props.className : '');

		let alertBlock = <div></div>;

		if (this.props.alertData) {

			// дополнительная ссылка, которая выводится под основным сообщением
			let secondaryLink = null;
			
			if (this.props.alertData.secondaryMessage) {
				if (this.props.alertData.secondaryLink) {
					secondaryLink = <div className = 'popup-form__item'>
										<Link to = {this.props.alertData.secondaryLink}>
											{this.props.alertData.secondaryMessage || 'something happened'}	
										</Link>
									</div>;
				}
				else if (this.props.alertData.secondaryHref) {
					secondaryLink = <div className = 'popup-form__item'>
										<a href={this.props.alertData.secondaryHref}>{this.props.alertData.secondaryMessage}</a>
									</div>;
				}
			}

			const alertInfo = <div>
									<div className = 'popup-form__item'>
										{this.props.alertData.message || 'something happened'}
									</div>

									{secondaryLink}

									<div className = 'popup-form__buttons-block'>
										<button className = '' >
											Ok
										</button>
									</div>
								</div>;

			// если нет доп.ссылки, то помещаем блок с оповещением в главную ссылку
			if (!secondaryLink && this.props.alertData.link) {
				alertBlock = <Link to = {this.props.alertData.link}>
								{alertInfo}	
							</Link>;
			}
			else {
				alertBlock = alertInfo;
			}
		}

		const data = <div className = {className} onClick = {this.props.resetAlertData}>
						{alertBlock}
					</div>;

		return (
			<PopupForm
                data = {data}
				colorTheme = {this.props.colorTheme}
				popupType = {forumConst.popupTypes.alert}
            />
		)
	}
}