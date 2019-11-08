'use strict';

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Channel from './channel';
import ListForm from './forms/listForm';

// Подраздел
export default class SubSection extends PureComponent {

    constructor(props) {
        super(props);

        this.showInfo = this.showInfo.bind(this);
    }

    showInfo() {
        debugger;
        this.props.setCurrentInfoSubSection(this.props.subSection);
    }

    render() {
        console.log('render subSection');
        const className = 'subsection ' + (this.props.className ? this.props.className : '');

        let subSection = <div></div>;
        const channels = [];
        let key = 0;

        if (this.props.subSection) {

            // if (this.props.isCurrent && this.props.subSection.channels) {
            //     this.props.subSection.channels.forEach(function(item) {
            //         const channel = <Channel
            //                             key={key}
            //                             channel = {item}
            //                         />;
            //         channels.push(channel);
            //         key++;
            //     }.bind(this));
            // }

            // subSection = <div>
            //                 {this.props.isCurrent
            //                     ?
            //                     this.props.subSection.name
            //                     :
            //                     <Link to={`/subsections/${this.props.subSection.id}`}>{this.props.subSection.name}</Link> 
            //                 }
            //                 <div>{this.props.subSection.description}</div>
            //                 {channels}
            //             </div>;

                if (this.props.subSection.channel) {
                    this.props.subSection.channel.forEach(function(item) {
                        const channel = <Channel
                                                key={key}
                                                channel = {item}
                                            />;
                        channels.push(channel);
                        key++;
                    }.bind(this));
                }

                subSection = <div>
                            {this.props.isCurrent 
                                ?
                                this.props.subSection.name
                                :
                                <Link to={`/subsections/${this.props.subSection.id}`}>{this.props.subSection.name}</Link>
                            }
                            
                            {this.props.isCurrent ? <div>{this.props.subSection.description}</div> : null}

                            {this.props.isCurrent
                                ?
                                <ListForm
                                    parentItemId = {this.props.subSection.id}
                                    items = {channels}
                                    currentInfoItem = {this.props.currentInfoChannel}
                                    setCurrentInfoItem = {this.props.setCurrentInfoChannel}
                                    modifiableItem = {this.props.modifiableChannel}
                                    setModifiableItem = {this.props.setModifiableChannel}
                                    modifyItem = {this.props.modifyChannel}
                                    deleteItem = {this.props.deleteChannel}
                                />
                                :
                                channels
                            }
                        </div>;
        }

        let subSectionInfoBlock = null;

        if (!this.props.isCurrent) {
            subSectionInfoBlock = <button className = '' onClick = {this.showInfo}>
                                    Информация
                                </button>;
        }
        
        return (
            <div className = {className}>
                {subSection}

                {subSectionInfoBlock}
            </div>
        )
    }
}