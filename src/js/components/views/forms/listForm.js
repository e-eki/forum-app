'use strict';

import React, { PureComponent } from 'react';
import InfoForm from './infoForm';
import ModifyForm from './modifyForm';
import forumConst from '../../../constants/forumConst';

export default class ListForm extends PureComponent {

    constructor(props) {
        super(props);

        this.addItem = this.addItem.bind(this);
        this.initNewItem = this.initNewItem.bind(this);
    }

    initNewItem() {
        debugger;

        let newItem;

        if (this.props.type) {
            switch (this.props.type) {

                case forumConst.itemTypes.message:
                    newItem = {
                        text: ''
                    };
                    break;
                    
                default:
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
        debugger;

        const newItem = this.initNewItem();

        if (newItem) {
            if (this.props.parentItemId) {
                newItem.parentItemId = this.props.parentItemId;
            }

            this.props.setModifiableItem(newItem);
        }
    }

    render() {
        debugger;
        //console.log('render ListForm');
        const className = 'list-form ' + (this.props.className ? this.props.className : '');

        let itemInfoBlock = null;       
        let modifyingItemBlock = null;

        if (this.props.currentInfoItem) {
            itemInfoBlock = <InfoForm
                                currentInfoItem = {this.props.currentInfoItem}
                                setCurrentInfoItem = {this.props.setCurrentInfoItem}
                                deleteItem = {this.props.deleteItem}

                                modifiableItem = {this.props.modifiableItem}
                                setModifiableItem = {this.props.setModifiableItem}
                                modifyItem = {this.props.modifyItem}
                                type = {this.props.type}
                            />;
        }

        // добавление нового элемента
        else if (this.props.modifiableItem) {
            modifyingItemBlock = <ModifyForm
                                    modifiableItem = {this.props.modifiableItem}
                                    setModifiableItem = {this.props.setModifiableItem}
                                    modifyItem = {this.props.modifyItem}
                                    type = {this.props.type}
                                />;
        }

        return (
            <div className = {className}>

                {modifyingItemBlock}

                {itemInfoBlock}

                <button className = '' onClick = {this.addItem}>
                    Добавить {this.props.type ? this.props.type : null}
                </button>

                {this.props.items || null}
            </div>
        )
    }
}