'use strict';

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Channel from './channel';
import ListForm from './forms/listForm';
import forumConst from '../../constants/forumConst';

// Подраздел
export default class SubSection extends PureComponent {

    constructor(props) {
        super(props);

        this.showInfo = this.showInfo.bind(this);
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return true; //todo??
    // }

    showInfo() {
        debugger;
        this.props.setCurrentInfoSubSection(this.props.subSection);
    }

    render() {
        //console.log('render subSection');
        const className = 'subsection ' + (this.props.className ? this.props.className : '');

        debugger;

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

                if (this.props.subSection.channels) {
                    this.props.subSection.channels.forEach(function(item) {
                        const channel = <Channel
                                            key={key}
                                            channel = {item}
                                            setCurrentInfoChannel = {this.props.setCurrentInfoChannel}
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
                            
                            <div>{this.props.subSection.description}</div>

                            {this.props.isCurrent
                                ?
                                <ListForm
                                    type = {forumConst.itemTypes.channel}
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
                                    Информация {this.props.subSection.name ? this.props.subSection.name : null}
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