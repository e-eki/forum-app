'use strict';

import React, { Component } from 'react';
import forumConst from '../../../constants/forumConst';

// Форма для перемещения элемента внутри списка/в другой элемент верхнего уровня
export default class MovingForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            movingInListType: null,
            parentItemName: null,
        };

        this.resetMovingItem = this.resetMovingItem.bind(this);
        this.changeData = this.changeData.bind(this);
        this.getParentItemType = this.getParentItemType.bind(this);
        this.getParentItemOptions = this.getParentItemOptions.bind(this);
        this.moveItem = this.moveItem.bind(this);
        this.moveItemInList = this.moveItemInList.bind(this);
        this.moveItemOtsideList = this.moveItemOtsideList.bind(this);
        this.getItemsList = this.getItemsList.bind(this);
        this.getMovingInListTypeOptions = this.getMovingInListTypeOptions.bind(this);

        this.parentItemType = this.getParentItemType();  //?
        this.parentItemOptions = this.getParentItemOptions();   //?

        this.itemsList = this.getItemsList();  //?
        this.movingInListOptions = this.getMovingInListTypeOptions();  //?
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;  //todo??
    }

    getParentItemType() {
        let parentItemType = null;

        if (this.props.type) {
            switch (this.props.type) {
                case forumConst.itemTypes.subSection:
                    parentItemType = forumConst.itemTypes.section;
                    break;

                case forumConst.itemTypes.channel:
                    parentItemType = forumConst.itemTypes.subSection;
                    break;

                case forumConst.itemTypes.message:
                    parentItemType = forumConst.itemTypes.channel;
                    break;
            }
        }

        return parentItemType;
    }

    getParentItemOptions() {
        debugger;
        const options = [];

        if (this.props.parentItemsList) {
            let i = 0;

            this.props.parentItemsList.forEach(item => {
                options.push(<option key={i++} value={item.name}>{item.name}</option>);
            })
        }
        
        return options;
    }

    getItemsList() {
        debugger;

        if (this.props.parentItemsList) {
            const parentItem = this.props.parentItemId
                                ?
                                this.props.parentItemsList.find(item => item.id === this.props.parentItemId)
                                :
                                null;

            if (this.props.type) {
                switch (this.props.type) {
                    case forumConst.itemTypes.section:
                        return this.props.parentItemsList;

                    case forumConst.itemTypes.subSection:
                        return (parentItem ? parentItem.subsections : null);

                    default:
                        return null;
                }
            }
        }

        return null; //?
    }

    getMovingInListTypeOptions() {
        debugger;
        const options = [];

        if (this.itemsList && (this.itemsList.length > 1)) {
            const index = itemsList.indexOf(this.props.movingItem);

            if ()
        }
    }

    resetMovingItem() {
        debugger;
        this.props.setMovingItem(null);
    }

	changeData(event) {
        debugger;
        const name = event.target.name;
        const value = event.target.value;

        if (name === movingInListType) {
            this.setState({
                movingInListType: value,
                parentItemName: null,
            })
        }
        if (name === movingInListType) {
            this.setState({
                movingInListType: null,
                parentItemName: value,
            })
        }
    }

    moveItem() {
        debugger;

        if (this.state.movingInListType) {
            this.moveItemInList();
        }
        else if (this.state.parentItemName) {
            this.moveItemOutsideList();
        }
    }

    moveItemInList() {
        debugger;
        // if (this.props.parentItemsList && this.props.parentItemId) {
        //     const parentItem = this.props.parentItemId
        //                         ?
        //                         this.props.parentItemsList.find(item => item.id === this.props.parentItemId)
        //                         :
        //                         null;

        //     if (this.props.type) {
        //         switch (this.props.type) {
        //             case forumConst.itemTypes.section:
                        
        //                 break;

        //             case forumConst.itemTypes.subSection:
        //                 parentItemType = forumConst.itemTypes.section;
        //                 break;
    
        //             case forumConst.itemTypes.channel:
        //                 parentItemType = forumConst.itemTypes.subSection;
        //                 break;
    
        //             case forumConst.itemTypes.message:
        //                 parentItemType = forumConst.itemTypes.channel;
        //                 break;
        //         }
        //     }
        // }
    }

    moveItemOtsideList() {
        debugger;

    }

    render() {
        //console.log('render movingForm');
        const className = 'moving-form ' + (this.props.className ? this.props.className : '');
        debugger;
        
        return (
            <div className = {className}>
                ПЕРЕМЕЩЕНИЕ ЭЛЕМЕНТА

                <div>
                    Переместить в списке на позицию 
                    <select
                        name="movingInListType"
                        className = ''
                        onChange = {this.changeData}
                        value = {this.state.movingInListType}
                    >
                        <option value={null}>{null}</option>
                        <option value={forumConst.movingInListTypes.up}>{forumConst.movingInListTypes.up}</option>
                        <option value={forumConst.movingInListTypes.down}>{forumConst.movingInListTypes.down}</option>
                    </select>
                </div>

                <div>
                    Переместить в элемент верхнего уровня ({this.parentItemType}) 
                    <select
                        name="parentItemName"
                        className = ''
                        onChange = {this.changeData}
                        value = {this.state.parentItemName}
                    >
                        {this.parentItemOptions}
                    </select>
                </div>

                <button className = '' onClick = {this.moveItem}>
                    Ок
                </button>

                <button className = '' onClick = {this.resetMovingItem}>
                    Закрыть
                </button>
            </div>
        )
    }
}
