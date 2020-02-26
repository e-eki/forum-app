'use strict';

import React, { Component } from 'react';
import Promise from 'bluebird';
import forumConst from '../../../constants/forumConst';
import * as baseUtils from '../../../utils/baseUtils';
import PopupForm from './popupForm';

// Форма для перемещения элемента внутри списка/в другой элемент верхнего уровня
export default class MovingForm extends Component {

    constructor(props) {
        super(props);

        this.defaultValue = '';

        this.state = {
            // тип перемещения внутри списка (вверх/вниз)
            movingInListType: this.defaultValue,
            // наименование родительского элемента
            parentItemName: this.defaultValue,
        };

        // список элементов верхнего уровня
        this.parentItemsList = null;
        // тип родительского элемента
        this.parentItemType = null;
        // список элементов верхнего уровня для выпадайки
        this.parentItemOptions = [];
        // список элементов в родительского элементе
        this.itemsList = null;
        // список типов перемещения внутри списка (вверх/вниз)
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
        // определяем список родительских элементов и, в зависимости от типа элемента, доступные выпадайки
        if (nextProps.parentItemsList !== this.parentItemsList) {
            this.parentItemsList = nextProps.parentItemsList;

            if (this.props.type) {
                if (this.props.type !== forumConst.itemTypes.section) {
                    this.parentItemType = this.getParentItemType();
                    this.parentItemOptions = this.getParentItemOptions(nextProps.parentItemsList);
                }

                if ((this.props.type === forumConst.itemTypes.section) ||
                    (this.props.type === forumConst.itemTypes.subSection)) {
                        this.itemsList = this.getItemsList(nextProps.parentItemsList);
                        this.movingInListTypeOptions = this.getMovingInListTypeOptions();
                    }
            }
        }

        return true;  //todo??
    }

    componentWillUnmount() {
        this.props.resetParentItemsList();
    }

    // определить тип родительского элемента
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

    // получить список элементов верхнего уровня для выпадайки
    getParentItemOptions(parentItemsList) {
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

    // получить список элементов в родительского элементе
    getItemsList(parentItemsList) {
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

    // полчуить список доступных типов перемещения внутри списка (вверх/вниз)
    getMovingInListTypeOptions() {
        const options = [];
        let i = 0;

        if (this.itemsList && (this.itemsList.length > 1)) {

            const index = this.itemsList.findIndex(item => item.id === this.props.movingItem.id);

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

    // отмена перемещения элемента
    resetMovingItem() {
        this.props.setMovingItem(null);
    }

    // ввод данных
	changeData(event) {
        const name = event.target.name;
        const value = event.target.value;

        // одновременно переместить элемент внутри списка и в другой элемент верхнего уровня нельзя,
        // поэтому при выборе одного типа, сбрасывается другой
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

    // переместить элемент
    moveItem() {  //todo: ?как вынести эту логику в контейнер?
        const tasks = []

        if (this.state.movingInListType) {
            tasks.push(this.moveItemInList());
        }
        else if (this.state.parentItemName) {
            tasks.push(this.moveItemOtsideList());
        }

        return Promise.all(tasks)
            .then(result => {
                debugger;
                
                this.resetMovingItem();
                this.props.setCurrentInfoItem(null);

                return true;
            })
            .catch(error => {
                baseUtils.showErrorMessage(error);
                return false;
            })
    }

    // переместить элемент внутри спсика
    moveItemInList() {
        const movingItems = [];
        
        if (this.itemsList && (this.itemsList.length > 1)) {
            const index = this.itemsList.findIndex(item => item.id === this.props.movingItem.id);

            switch (this.state.movingInListType) {

                // при перемещении элемента вверх редактируется номер в списке у всех предшествующих элементов
                case forumConst.movingInListTypes.up:
                    const prevItem = this.itemsList[index - 1];

                    this.props.movingItem.orderNumber--;                   
                    prevItem.orderNumber++;               

                    movingItems.push(this.props.movingItem);
                    movingItems.push(prevItem);

                    break;

                // при перемещении элемента вниз редактируется номер в списке у всех последующих элементов
                case forumConst.movingInListTypes.down:
                    const nextItem = this.itemsList[index + 1];

                    this.props.movingItem.orderNumber++;                   
                    nextItem.orderNumber--;             

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
                .then(result => true)
                .catch(error => {
                    baseUtils.showErrorMessage(error);
                    return false;
                })
        }
        else {
            return false;
        }
    }

    // перемещение элемента в другой элемент верхнего уровня
    moveItemOtsideList() {
        const tasks = [];

        const movingItem = this.props.movingItem;
        const prevParentId = movingItem.parentItemId || movingItem.sectionId || movingItem.subSectionId || movingItem.channelId;

        // если перемещаем подраздел, то в предыдущем родительском элементе нужно поправить
        // номера всем под-элементам, следующим за перемещаемым
        if (this.props.type === forumConst.itemTypes.subSection) {
            const prevParent = this.parentItemsList.find(item => item.id === prevParentId);

            if (prevParent.subSections.length > 1) {
                prevParent.subSections.forEach(item => {
                    if (item.orderNumber > movingItem.orderNumber) {
                        item.orderNumber--;
                        tasks.push(this.props.modifyItem(item));  //?
                    }
                })
            }
        }

        const parent = this.parentItemsList.find(item => item.name === this.state.parentItemName);

        movingItem.parentItemId = parent.id;

        // если в элементе, в кот. перемещаем, есть под-элементы, то номер перемещаемого = кол-ву под-элементов + 1
        if (this.props.type === forumConst.itemTypes.subSection) {
            movingItem.orderNumber = parent.subSections ? parent.subSections.length : 0;
        }
        
        tasks.push(this.props.modifyItem(this.props.movingItem));

        return Promise.all(tasks)
            .then(result => {
                this.props.deletedItemAction(movingItem.id, prevParentId);

                return true;
            })
            .catch(error => {
                baseUtils.showErrorMessage(error);
                return false;
            })
    }

    render() {
        const className = 'moving-form ' + (this.props.className ? this.props.className : '');
        debugger;

        const movingOutsideListBlock = (this.props.type && (this.props.type !== forumConst.itemTypes.section)) 
                                    ?
                                    <div className = 'popup-form__item'>
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
                                    :
                                    null;

        const movingInListBlock = (this.props.type &&
                                    ((this.props.type === forumConst.itemTypes.section) ||
                                    (this.props.type === forumConst.itemTypes.subSection)))
                                    ?
                                    <div className = 'popup-form__item'>
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
                                    :
                                    null;

        const noteBlock = (!movingOutsideListBlock && !movingInListBlock)
                            ?
                            'некуда перемещать'
                            :
                            null;

        const data = <div className = {className}>
                        <div className = 'popup-form__title'>
                            Перемещение
                        </div>

                        {movingInListBlock}

                        {movingOutsideListBlock}

                        {noteBlock}

                        <div className = 'popup-form__buttons-block'>
                            <button className = '' onClick = {this.moveItem}>
                                Ок
                            </button>

                            <button className = '' onClick = {this.resetMovingItem}>
                                Закрыть
                            </button>
                        </div>
                    </div>;
        
        return (
            <PopupForm
                data = {data}
                colorTheme = {this.props.colorTheme}
            />
        )
    }
}
