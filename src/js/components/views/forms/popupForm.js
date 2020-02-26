'use strict';

import React, { PureComponent } from 'react';
import forumConst from '../../../constants/forumConst';

// всплывающее окно
export default class PopupForm extends PureComponent {

	constructor(props) {
		super(props);
	}

	render() {
		let className = 'popup-form ' + (this.props.className ? this.props.className : '');

		//colorTheme = {this.props.colorTheme}
		if (this.props.colorTheme === forumConst.colorThemes.night) {
			className += 'popup-form_night-mode';
		}
		else {
			className += 'popup-form_day-mode';
		}

		const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        // const scrollLeft = document.documentElement.scrollLeft;
        // const clientWidth = document.documentElement.clientWidth;

        const top = clientHeight/2 - 90 + scrollTop;
        // const left = clientWidth/2 - 270 + scrollLeft;
        const style = {top: top};

		return (
			<div className = {className} style={style}>
				{this.props.data || null}
			</div>
		)
	}
}