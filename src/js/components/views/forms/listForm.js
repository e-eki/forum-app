'use strict';

import React, { PureComponent } from 'react';
import InfoForm from './infoForm';
import ModifyForm from './modifyForm';
import forumConst from '../../../constants/forumConst';
import * as baseUtils from '../../../utils/baseUtils';

export default class ListForm extends PureComponent {

    constructor(props) {
        super(props);

        this.addItem = this.addItem.bind(this);
        this.initNewItem = this.initNewItem.bind(this);
    }

    initNewItem() {
        let newItem;

        if (this.props.type) {
            switch (this.props.type) {

                case forumConst.itemTypes.message:
                    newItem = {
                        text: ''
                    };
                    break;

                case forumConst.itemTypes.section:
                case forumConst.itemTypes.subSection:
                    newItem = {
                        name: '',
                        description: '',
                        //orderNumber: this.props.items ? this.props.items.length : 0,   //?
                    };
                    break;
                    
                default:  //?
                    newItem = {
                        name: '',
                        description: '',
                    };
                    break;
            }
        }

        return newItem;
    }

    addItem() {
        const newItem = this.initNewItem();

        if (newItem) {
            if (this.props.parentItemId) {
                newItem.parentItemId = this.props.parentItemId;
            }
            if (this.props.recipientId) {
                newItem.recipientId = this.props.recipientId;
            }

            this.props.setModifiableItem(newItem);
        }
    }

    render() {
        //console.log('render ListForm');
        const className = 'list-form ' + (this.props.className ? this.props.className : '');

        debugger;
        let itemInfoBlock = null;       
        let modifyingItemBlock = null;

        if (this.props.currentInfoItem &&
            (this.props.currentInfoItem.canEdit || this.props.currentInfoItem.canDelete)) {   //?
                itemInfoBlock = <InfoForm
                                    currentInfoItem = {this.props.currentInfoItem}
                                    setCurrentInfoItem = {this.props.setCurrentInfoItem}
                                    deleteItem = {this.props.deleteItem}
                                    setMovingItem = {this.props.setMovingItem}
                                    modifiableItem = {this.props.modifiableItem}
                                    movingItem = {this.props.movingItem}
                                    setModifiableItem = {this.props.setModifiableItem}
                                    modifyItem = {this.props.modifyItem}
                                    type = {this.props.type}
                                    setDescriptionMessage = {this.props.setDescriptionMessage}
                                    deletedItemAction = {this.props.deletedItemAction}
                                    
                                    parentItemsList = {this.props.parentItemsList}
                                    resetParentItemsList = {this.props.resetParentItemsList}
                                    parentItemId = {this.props.parentItemId}
                                />;
        }
        // добавление нового элемента
        else if (this.props.modifiableItem && this.props.canAdd) {  //?
            modifyingItemBlock = <ModifyForm
                                    modifiableItem = {this.props.modifiableItem}
                                    setModifiableItem = {this.props.setModifiableItem}
                                    modifyItem = {this.props.modifyItem}
                                    type = {this.props.type}
                                />;
        }

        let addButtonBlock = null;
        if (this.props.canAdd) {  //?
            addButtonBlock = <button className = '' onClick = {this.addItem}>
                                Добавить {this.props.type ? this.props.type : null}
                            </button>;
        }

        let itemsBlock = null;

        if (this.props.items) {
            if (this.props.type === forumConst.itemTypes.message && this.props.newMessagesCount) {
                const newItems = this.props.items.slice(-this.props.newMessagesCount);
                const oldItems = this.props.items.slice(0, -this.props.newMessagesCount);

                itemsBlock = <div>
                                {oldItems}
                                -----новые сообщения-----
                                {newItems}
                            </div>;
            }
            else {
                itemsBlock = this.props.items;
            }
        }

        return (
            <div className = {className}>

                {modifyingItemBlock}

                {itemInfoBlock}

                {addButtonBlock}

                {itemsBlock}
            </div>
        )
    }
}