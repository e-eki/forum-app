'use strict';

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import appConst from '../../constants/appConst';

// "хлебные крошки" - путь к текущему элементу
export default class Breadcrumbs extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        const className = 'breadcrumbs ' + (this.props.className ? this.props.className : '');

        const paths = [];
        const breadcrumbs = [];
        let i = 0;

        paths.push(<Link key={i++} to={`${appConst.defaultLink}`}>
                        <div>Главная</div>
                    </Link>);

        if (this.props.currentSubSection &&
            this.props.currentSubSection.parentSection) {
                const parentSection = this.props.currentSubSection.parentSection;

                paths.push(<Link key={i++} to={`${appConst.defaultLink}sections/${parentSection.id}`}>
                                <div>{parentSection.name}</div>
                            </Link>);
        }

        if (this.props.currentChannel) {
                if (this.props.currentChannel.parentSection) {
                    const parentSection = this.props.currentChannel.parentSection;

                    paths.push(<Link key={i++} to={`${appConst.defaultLink}sections/${parentSection.id}`}>
                                    <div>{parentSection.name}</div>
                                </Link>);
                }

                if (this.props.currentChannel.parentSubSection) {
                    const parentSubSection = this.props.currentChannel.parentSubSection;

                    paths.push(<Link key={i++} to={`${appConst.defaultLink}subsections/${parentSubSection.id}`}>
                                    <div>{parentSubSection.name}</div>
                                </Link>);
                }    
        }

        i = 0;
        paths.forEach(item => {
            breadcrumbs.push(<span key={i++} className=''>{item}</span>);
        })
        
        return (
            <div className = {className}>
                -----
                <div>Breadcrumbs</div>

                {breadcrumbs}
                -----
            </div>
        )
    }
}