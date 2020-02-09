'use strict';

import React, { PureComponent } from 'react';
import Promise from 'bluebird';
import ModifyForm from './modifyForm';
import MovingForm from './movingForm';
import forumConst from '../../../constants/forumConst';
import * as baseUtils from '../../../utils/baseUtils';

export default class InfoForm extends PureComponent {

    constructor(props) {
        super(props);

        this.resetInfoItem = this.resetInfoItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.moveItem = this.moveItem.bind(this);
        this.initItemInfo = this.initItemInfo.bind(this);
        this.setDescriptionMessage = this.setDescriptionMessage.bind(this);
    }

    initItemInfo() {
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
        return Promise.resolve(this.props.deleteItem(this.props.currentInfoItem))
            .then(result => {
                this.resetInfoItem();  //?
            })
            .catch(error => {
                baseUtils.showErrorMessage(error);
                return false;
            })
    }

    editItem() {
        debugger;
        this.props.setModifiableItem(this.props.currentInfoItem);
    }

    moveItem() {
        debugger;
        this.props.setMovingItem(this.props.currentInfoItem);
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
        let movingBlock = null;
        debugger;

        if (this.props.modifiableItem && this.props.modifiableItem.canEdit) {   //?
            modifyingBlock = <ModifyForm
                                modifiableItem = {this.props.modifiableItem}
                                setModifiableItem = {this.props.setModifiableItem}
                                modifyItem = {this.props.modifyItem}
                                type = {this.props.type}
                            />;
        }
        else if (this.props.movingItem && this.props.movingItem.canMove) {  //?
            movingBlock = <MovingForm
                                movingItem = {this.props.movingItem}
                                setMovingItem = {this.props.setMovingItem}
                                resetInfoItem = {this.resetInfoItem}
                                modifyItem = {this.props.modifyItem}
                                type = {this.props.type}
                                deletedItemAction = {this.props.deletedItemAction}

                                parentItemsList = {this.props.parentItemsList}
                                resetParentItemsList = {this.props.resetParentItemsList}
                                parentItemId = {this.props.parentItemId}
                            />
        }

        debugger;
        let descriptionButtonBlock = null;
        let editButtonBlock = null;
        let moveButtonBlock = null;
        let deleteButtonBlock = null;

        if (this.props.currentInfoItem.canEditChannel) {
            descriptionButtonBlock = <button className = '' onClick = {this.setDescriptionMessage}>
                                        Закрепить сообщение
                                    </button>;
        }

        if (this.props.currentInfoItem.canEdit) {
            editButtonBlock = <button className = '' onClick = {this.editItem}>
                                    Редактировать {this.props.type ? this.props.type : null}
                                </button>;
        }

        if (this.props.currentInfoItem.canMove) {
            moveButtonBlock = <button className = '' onClick = {this.moveItem}>
                                    Переместить {this.props.type ? this.props.type : null}
                                </button>;
        }

        if (this.props.currentInfoItem.canDelete) {
            deleteButtonBlock = <button className = '' onClick = {this.deleteItem}>
                                    Удалить {this.props.type ? this.props.type : null}
                                </button>;
        }

        const itemInfo = this.initItemInfo();
        
        return (
            <div className = {className}>

                {modifyingBlock}

                {movingBlock}

                {itemInfo}

                {descriptionButtonBlock}

                {editButtonBlock}

                {moveButtonBlock}

                {deleteButtonBlock}

                <button className = '' onClick = {this.resetInfoItem}>
                    Закрыть
                </button>
            </div>
        )
    }
}
