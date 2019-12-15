'use strict';

import React, { PureComponent } from 'react';
import ModifyForm from './modifyForm';
import forumConst from '../../../constants/forumConst';
import { getSections } from '../../../api/sectionApi';

export default class InfoForm extends PureComponent {

    constructor(props) {
        super(props);

        this.movingBlock = null;

        this.resetInfoItem = this.resetInfoItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.initItemInfo = this.initItemInfo.bind(this);
        this.setDescriptionMessage = this.setDescriptionMessage.bind(this);
        this.initMovingBlock = this.initMovingBlock.bind(this);
        this.changeData = this.changeData.bind(this);
        this.moveInList = this.moveInList.bind(this);
    }

    componentWillMount() {
        debugger;

        return Promise.resolve(this.initMovingBlock())
            .then(result => true);
    }

    // ввод данных
	changeData(event) {
        debugger;
        const name = event.target.name;
        const value = event.target.value;

        this.props.currentInfoItem[name] = value;
    }

    moveInList(event) {
        debugger;
        const movingInListType = event.target.value;

        if (this.props.moveItemInList) {
            this.props.moveItemInList(this.props.currentInfoItem, movingInListType);
        }
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

    initMovingBlock() {
        debugger;
        let movingInListBlock = null;
        let movingOutBlock = null;

        if (this.props.items && this.props.items.length > 1 && this.props.moveItemInList) {
            movingInListBlock = <div>
                                    Переместить в списке на позицию 
                                    <select
                                        name="movingInListType"
                                        className = ''
                                        onChange = {this.moveInList}
                                        value = {forumConst.movingInListTypes.up}
                                    >
                                        <option value={forumConst.movingInListTypes.up}>{forumConst.movingInListTypes.up}</option>
                                        <option value={forumConst.movingInListTypes.down}>{forumConst.movingInListTypes.down}</option>
                                    </select>
                                </div>;
        }

        if (this.props.type === forumConst.itemTypes.section) {
            this.movingBlock = movingInListBlock;

            return true;
        }
        else if (this.props.type === forumConst.itemTypes.subSection) {
            return getSections()
                .then(sections => {
                    debugger;
                    if (sections && sections.length > 1) {
                        const options = [];
                        let currentSectionName;

                        sections.forEach(item => {
                            if (item.id === this.props.currentInfoItem.sectionId) {
                                currentSectionName = item.name;
                            }

                            options.push(<option key={item.id} value={item.id}>{item.name}</option>);
                        });

                        movingOutBlock = <div>
                                            Переместить в раздел 
                                            <select
                                                name="sectionId"
                                                className = ''
                                                onChange = {this.changeData}
                                                value = {currentSectionName}
                                            >
                                                {options}
                                            </select>
                                        </div>;
                    }

                   this.movingBlock = <div>
                                        {movingInListBlock}
                                        {movingOutBlock}   
                                    </div>;

                    return true;
                })
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

        const itemInfo = this.initItemInfo();
        
        return (
            <div className = {className}>

                {modifyingBlock}

                {itemInfo}

                <button className = '' onClick = {this.editItem}>
                    Редактировать {this.props.type ? this.props.type : null}
                </button>

                {setDescriptionMessageBlock}

                {this.movingBlock}

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
