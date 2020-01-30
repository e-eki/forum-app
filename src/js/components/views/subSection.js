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
                                    canAdd = {this.props.subSection ? this.props.subSection.canAdd : false}
                                    type = {forumConst.itemTypes.channel}
                                    parentItemId = {this.props.subSection.id}
                                    items = {channels}
                                    currentInfoItem = {this.props.currentInfoChannel}
                                    setCurrentInfoItem = {this.props.setCurrentInfoChannel}
                                    modifiableItem = {this.props.modifiableChannel}
                                    movingItem = {this.props.movingChannel}
                                    setModifiableItem = {this.props.setModifiableChannel}
                                    setMovingItem = {this.props.setMovingChannel}
                                    modifyItem = {this.props.modifyChannel}
                                    deleteItem = {this.props.deleteChannel}
                                    deletedItemAction = {this.props.deleteChannelById}

                                    parentItemsList = {this.props.parentItemsList}
                                    resetParentItemsList = {this.props.resetParentItemsList}
                                />
                                :
                                channels
                            }
                        </div>;
        }

        let subSectionInfoBlock = null;

        if (!this.props.isCurrent &&
            (this.props.subSection && (this.props.subSection.canEdit || this.props.subSection.canDelete))) {
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