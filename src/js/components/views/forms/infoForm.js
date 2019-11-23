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
    }

    initItemInfo() {
        debugger;
        let itemInfo;

        if (this.props.type) {
            switch (this.props.type) {

                case forumConst.itemTypes.message:
                    itemInfo = <div>
                                    <div>{this.props.data.date.toLocaleTimeString()}</div>
                                    <div>{this.props.data.text}</div>
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

    render() {
        //console.log('render infoForm');
        const className = 'info-form ' + (this.props.className ? this.props.className : '');

        let modifyingBlock = null;
        debugger;

        if (this.props.modifiableItem) {
            modifyingBlock = <ModifyForm
                                modifiableItem = {this.props.modifiableItem}
                                setModifiableItem = {this.props.setModifiableItem}
                                modifyItem = {this.props.modifyItem}
                                type = {this.props.type}
                            />;
        }

        const itemInfo = this.initItemInfo();
        
        return (
            <div className = {className}>

            {modifyingBlock}

                {itemInfo}

                <button className = '' onClick = {this.editItem}>
                    Редактировать {this.props.type ? this.props.type : null}
                </button>

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
