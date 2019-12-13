'use strict';

import React, { PureComponent } from 'react';
import ModifyForm from './modifyForm';
import forumConst from '../../../constants/forumConst';

export default class InfoForm extends PureComponent {

    constructor(props) {
        super(props);

        this.resetInfoItem = this.resetInfoItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.initItemInfo = this.initItemInfo.bind(this);
        this.setDescriptionMessage = this.setDescriptionMessage.bind(this);
    }

    initItemInfo() {
        debugger;
        let itemInfo = null;

        if (this.props.type && this.props.currentInfoItem) {
            switch (this.props.type) {

                case forumConst.itemTypes.message:
                    itemInfo = <div>
                                    <div>{this.props.currentInfoItem.text}</div>
                                </div>;
                    break;
                    
                default:
                    itemInfo = <div>
                                    <div>{this.props.currentInfoItem.name}</div>
                                    <div>{this.props.currentInfoItem.description}</div>
                                </div>;

                    break;
            }
        }

        return itemInfo;
    }

    resetInfoItem() {
        debugger;
        this.props.setCurrentInfoItem(null);
    }

    deleteItem() {
        debugger;
        this.props.deleteItem(this.props.currentInfoItem);
    }

    editItem() {
        debugger;
        this.props.setModifiableItem(this.props.currentInfoItem);
    }

    setDescriptionMessage() {
        debugger;
        if (this.props.setDescriptionMessage) {
            this.props.setDescriptionMessage(this.props.currentInfoItem);
        }
    }

    render() {
        //console.log('render infoForm');
        const className = 'info-form ' + (this.props.className ? this.props.className : '');

        let modifyingBlock = null;
        let setDescriptionMessageBlock = null;
        debugger;

        if (this.props.modifiableItem) {
            modifyingBlock = <ModifyForm
                                modifiableItem = {this.props.modifiableItem}
                                setModifiableItem = {this.props.setModifiableItem}
                                modifyItem = {this.props.modifyItem}
                                type = {this.props.type}
                            />;
        }

        if (this.props.currentInfoItem &&
            (this.props.type === forumConst.itemTypes.message)) {
                setDescriptionMessageBlock = <button className = '' onClick = {this.setDescriptionMessage}>
                                                Закрепить сообщение
                                            </button> 
        }

        const itemInfo = this.initItemInfo();
        
        return (
            <div className = {className}>

            {modifyingBlock}

                {itemInfo}

                <button className = '' onClick = {this.editItem}>
                    Редактировать {this.props.type ? this.props.type : null}
                </button>

                {setDescriptionMessageBlock}

                <button className = '' onClick = {this.deleteItem}>
                    Удалить {this.props.type ? this.props.type : null}
                </button>

                <button className = '' onClick = {this.resetInfoItem}>
                    Закрыть
                </button>
            </div>
        )
    }
}
