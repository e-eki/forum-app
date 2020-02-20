'use strict';

import React, { PureComponent } from 'react';
import Promise from 'bluebird';
import ModifyForm from './modifyForm';
import MovingForm from './movingForm';
import forumConst from '../../../constants/forumConst';
import * as baseUtils from '../../../utils/baseUtils';

// форма для просмотра информации и управления элементом
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

    // создание полей с информацией элемента
    initItemInfo() {
        let itemInfo = null;

        if (this.props.type && this.props.currentInfoItem) {
            switch (this.props.type) {

                // у сообщения доступен только текст
                case forumConst.itemTypes.message:
                    itemInfo = <div>
                                    <div>{this.props.currentInfoItem.text}</div>
                                </div>;
                    break;
                    
                // у всех остальных элементов (раздел/подраздел/чат) доступно название и описание
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

    // отмена просмотра информации элемента
    resetInfoItem() {
        this.props.setCurrentInfoItem(null);
    }

    // удалить элемент
    deleteItem() {
        return Promise.resolve(this.props.deleteItem(this.props.currentInfoItem))
            .then(result => {
                this.resetInfoItem();  //?
            })
            .catch(error => {
                baseUtils.showErrorMessage(error);
                return false;
            })
    }

    // назначить элемент редактируемым (редактирование в новом окне)
    editItem() {
        this.props.setModifiableItem(this.props.currentInfoItem);
    }

    // назначить элемент перемещаемым (перемещение в новом окне)
    moveItem() {
        this.props.setMovingItem(this.props.currentInfoItem);
    }

    // закрепить сообщение (в чате)
    setDescriptionMessage() {
        if (this.props.setDescriptionMessage) {
            this.props.setDescriptionMessage(this.props.currentInfoItem);
        }
    }

    render() {
        const className = 'info-form ' + (this.props.className ? this.props.className : '');

        let modifyingBlock = null;
        let movingBlock = null;
        debugger;

        // если элемент был назначен редактируемым и есть права на его редактирование
        if (this.props.modifiableItem && this.props.modifiableItem.canEdit) {
            // то показываем окно для редактирования элемента
            modifyingBlock = <ModifyForm
                                modifiableItem = {this.props.modifiableItem}
                                setModifiableItem = {this.props.setModifiableItem}
                                modifyItem = {this.props.modifyItem}
                                type = {this.props.type}
                            />;
        }
        // если элемент был назначен перемещаемым и есть права на его перемещение
        else if (this.props.movingItem && this.props.movingItem.canMove) {
            // то показываем окно для перемещения элемента
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

        let descriptionButtonBlock = null;
        let editButtonBlock = null;
        let moveButtonBlock = null;
        let deleteButtonBlock = null;

        // если есть права редактирования чата (в сообщении), то показываем кнопку "Закрепить сообщение"
        if (this.props.currentInfoItem.canEditChannel) {
            descriptionButtonBlock = <button className = '' onClick = {this.setDescriptionMessage}>
                                        Закрепить сообщение
                                    </button>;
        }

        // если есть права редактирования элемента. то показываем кнопку "Редактировать"
        if (this.props.currentInfoItem.canEdit) {
            editButtonBlock = <button className = '' onClick = {this.editItem}>
                                    Редактировать {this.props.type ? this.props.type : null}
                                </button>;
        }

        // если есть права перемещения элемента, то показываем кнопку "Переместить"
        if (this.props.currentInfoItem.canMove) {
            moveButtonBlock = <button className = '' onClick = {this.moveItem}>
                                    Переместить {this.props.type ? this.props.type : null}
                                </button>;
        }

        // если есть права удаления элемента, то показываем кнопку "Удалить"
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
