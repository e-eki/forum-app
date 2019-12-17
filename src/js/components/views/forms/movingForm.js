'use strict';

import React, { Component } from 'react';
import Promise from 'bluebird';
import forumConst from '../../../constants/forumConst';

// Форма для перемещения элемента внутри списка/в другой элемент верхнего уровня
export default class MovingForm extends Component {

    constructor(props) {
        super(props);

        this.defaultValue = '';

        this.state = {
            movingInListType: this.defaultValue,
            parentItemName: this.defaultValue,
        };

        this.parentItemsList = null;
        this.parentItemType = null;
        this.parentItemOptions = [];
        this.itemsList = null;
        this.movingInListTypeOptions = [];

        this.resetMovingItem = this.resetMovingItem.bind(this);
        this.changeData = this.changeData.bind(this);
        this.getParentItemType = this.getParentItemType.bind(this);
        this.getParentItemOptions = this.getParentItemOptions.bind(this);
        this.moveItem = this.moveItem.bind(this);
        this.moveItemInList = this.moveItemInList.bind(this);
        this.moveItemOtsideList = this.moveItemOtsideList.bind(this);
        this.getItemsList = this.getItemsList.bind(this);
        this.getMovingInListTypeOptions = this.getMovingInListTypeOptions.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        debugger;
        if (nextProps.parentItemsList !== this.parentItemsList) {
            this.parentItemsList = nextProps.parentItemsList;

            this.parentItemType = this.getParentItemType();  //?
            this.parentItemOptions = this.getParentItemOptions(nextProps.parentItemsList);   //?

            this.itemsList = this.getItemsList(nextProps.parentItemsList);  //?
            this.movingInListTypeOptions = this.getMovingInListTypeOptions();  //?
        }

        return true;  //todo??
    }

    componentWillUnmount() {
        debugger;
        this.props.resetParentItemsList();
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

    getParentItemOptions(parentItemsList) {
        debugger;
        const options = [];
        let i = 0;

        if (parentItemsList) {
            parentItemsList.forEach(item => {
                if (this.props.parentItemId && item.id !== this.props.parentItemId) {
                    options.push(<option key={i++} value={item.name}>{item.name}</option>);
                }
            })
        }
        
        if (options.length) {
            options.unshift(<option key={i++} value={this.defaultValue}></option>);
        }
        return options;
    }

    getItemsList(parentItemsList) {
        debugger;

        if (parentItemsList) {
            const parentItem = this.props.parentItemId
                                ?
                                parentItemsList.find(item => item.id === this.props.parentItemId)
                                :
                                null;

            if (this.props.type) {
                switch (this.props.type) {
                    case forumConst.itemTypes.section:
                        return parentItemsList;

                    case forumConst.itemTypes.subSection:
                        return (parentItem ? parentItem.subSections : null);

                    //чат и сообщение не имеет смысла перемещать в пределах списка, т.к. они сортируются по дате

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
        let i = 0;

        if (this.itemsList && (this.itemsList.length > 1)) {
            const index = this.itemsList.indexOf(this.props.movingItem);

            if (index !== -1) {

                if (index < (this.itemsList.length - 1)) {
                    options.push(<option
                                        key={i++}
                                        value={forumConst.movingInListTypes.down}
                                    >
                                        {forumConst.movingInListTypes.down}
                                    </option>);
                }

                if (index > 0) {
                    options.push(<option
                                        key={i++}
                                        value={forumConst.movingInListTypes.up}
                                    >
                                        {forumConst.movingInListTypes.up}
                                    </option>);
                }
            }
        }

        if (options.length) {
            options.unshift(<option key={i++} value={this.defaultValue}></option>);
        }

        return options;
    }

    resetMovingItem() {
        debugger;
        this.props.setMovingItem(null);
    }

	changeData(event) {
        debugger;
        const name = event.target.name;
        const value = event.target.value;

        if (value !== this.defaultValue) {
            if (name === 'movingInListType') {
                this.setState({
                    movingInListType: value,
                    parentItemName: this.defaultValue,
                })
            }
            if (name === 'parentItemName') {
                this.setState({
                    movingInListType: this.defaultValue,
                    parentItemName: value,
                })
            }
        }
    }

    moveItem() {
        debugger;
        const tasks = []

        if (this.state.movingInListType) {
            tasks.push(this.moveItemInList());
        }
        else if (this.state.parentItemName) {
            tasks.push(this.moveItemOutsideList());
        }

        return Promise.all(tasks)
            .then(result => {
                debugger;
                this.resetMovingItem();
                this.props.resetInfoItem();

                return true;
            })
    }

    moveItemInList() {  //?как вынести эту логику в контейнер?
        debugger;
        const movingItems = [];
        
        if (this.itemsList && (this.itemsList.length > 1)) {
            const index = this.itemsList.indexOf(this.props.movingItem);

            switch (this.state.movingInListType) {

                case forumConst.movingInListTypes.up:
                    const prevItem = this.itemsList[index - 1];

                    this.props.movingItem.orderNumber--;  //?                   
                    prevItem.orderNumber++;               //?

                    movingItems.push(this.props.movingItem);
                    movingItems.push(prevItem);

                    break;

                case forumConst.movingInListTypes.down:
                    const nextItem = this.itemsList[index + 1];

                    this.props.movingItem.orderNumber++;  //?                   
                    nextItem.orderNumber--;               //? 

                    movingItems.push(this.props.movingItem);
                    movingItems.push(nextItem);

                    break;
            }
        }

        if (movingItems.length) {
            const tasks = [];

            movingItems.forEach(item => {
                tasks.push(this.props.modifyItem(item));
            });

            return Promise.all(tasks)
                .then(result => true);
        }
        else {
            return false;
        }
    }

    moveItemOtsideList() {   //?как вынести эту логику в контейнер?
        debugger;
        const parent = this.parentItemsList.find(item => item.name === this.state.parentItemName);

        this.props.movingItem.parentItemId = parent.id;

        return this.props.modifyItem(this.props.movingItem)
            .then(result => true);
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
                        {this.movingInListTypeOptions}
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
