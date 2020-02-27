'use strict';

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Channel from './channel';
import ListForm from './forms/listForm';
import forumConst from '../../constants/forumConst';

// подраздел
export default class SubSection extends PureComponent {

    constructor(props) {
        super(props);

        this.showInfo = this.showInfo.bind(this);
    }

    // показать информацию и элементы управления подразделом
    showInfo() {
        this.props.setCurrentInfoSubSection(this.props.subSection);
    }

    render() {
        const className = 'subsection forum-item ' + (this.props.className ? this.props.className : '');

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
                                <div className = 'forum-item__title'>
                                    {this.props.isCurrent 
                                        ?
                                        this.props.subSection.name
                                        :
                                        <Link to={`/subsections/${this.props.subSection.id}`}>{this.props.subSection.name}</Link>
                                    }
                                </div>

                                {
                                    this.props.subSection.description
                                    ?
                                    <div className = 'forum-item__description'>
                                        {this.props.subSection.description}
                                    </div>
                                    :
                                    null
                                }

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

                                        colorTheme = {this.props.colorTheme}
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