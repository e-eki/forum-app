'use strict';

import React, { PureComponent } from 'react';
import InfoForm from './infoForm';
import ModifyForm from './modifyForm';

export default class ListForm extends PureComponent {

    constructor(props) {
        super(props);

        this.addItem = this.addItem.bind(this);
    }

    addItem() {
        debugger;

        const newItem = {   //??
            name: '',
            description: '',
        };

        if (this.props.parentItemId) {
            newItem.parentItemId = this.props.parentItemId;
        }

        this.props.setModifiableItem(newItem);
    }

    render() {
        debugger;
        console.log('render ListForm');
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
                                />;
        }

        else if (this.props.modifiableItem) {
            modifyingItemBlock = <ModifyForm
                                        modifiableItem = {this.props.modifiableItem}
                                        setModifiableItem = {this.props.setModifiableItem}
                                        modifyItem = {this.props.modifyItem}
                                    />;
        }

        return (
            <div className = {className}>

                {modifyingItemBlock}

                {itemInfoBlock}

                <button className = '' onClick = {this.addItem}>
                    Добавить
                </button>

                {this.props.items || null}
            </div>
        )
    }
}