'use strict';

import React, { PureComponent } from 'react';
import InfoForm from './infoForm';
import ModifyForm from './modifyForm';
import forumConst from '../../../constants/forumConst';

// форма для просмотра и управления списком элементов
export default class ListForm extends PureComponent {

    constructor(props) {
        super(props);

        this.addItem = this.addItem.bind(this);
        this.initNewItem = this.initNewItem.bind(this);
    }

    // инициализация полей нового элемента (для добавления)
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

    // добавить элемент
    addItem() {
        const newItem = this.initNewItem();

        if (newItem) {
            if (this.props.parentItemId) {
                newItem.parentItemId = this.props.parentItemId;
            }
            if (this.props.recipientId) {
                newItem.recipientId = this.props.recipientId;
            }

            // назначаем новый элемент с полями по умолчанию редактируемым
            this.props.setModifiableItem(newItem);
        }
    }

    render() {
        const className = 'list-form ' + (this.props.className ? this.props.className : '');

        debugger;
        let itemInfoBlock = null;       
        let modifyingItemBlock = null;

        // если был назначен элемент для просмотра его информации/управления,
        // и есть права для его редактирования либо удаления, то показываем форму для просмотра информации/управления
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

                                    colorTheme = {this.props.colorTheme}
                                />;
        }
        // добавление нового элемента
        else if (this.props.modifiableItem && this.props.canAdd) {  //?
            modifyingItemBlock = <ModifyForm
                                    modifiableItem = {this.props.modifiableItem}
                                    setModifiableItem = {this.props.setModifiableItem}
                                    modifyItem = {this.props.modifyItem}
                                    type = {this.props.type}

                                    colorTheme = {this.props.colorTheme}
                                />;
        }

        let addButtonBlock = null;
        // если есть права для добавления новых элементов, то показываем кнопку "Добавить"
        if (this.props.canAdd) {
            const buttonClassName = (this.props.type === forumConst.itemTypes.message) ? 'list-form__add-button' : '';

            addButtonBlock = <button className = {buttonClassName} onClick = {this.addItem}>
                                    Добавить {this.props.type ? this.props.type : null}
                                </button>;
        }

        // список элементов
        let itemsBlock = null;

        if (this.props.items) {
            // если это список сообщений, то нужно найти новые
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

                {/* {addButtonBlock} */}
                {/* <div>
                    (this.props.type !== forumConst.itemTypes.message)
                        ?
                        {addButtonBlock}
                        :
                        null
                </div> */}

                {itemsBlock}

                {addButtonBlock}
            </div>
        )
    }
}