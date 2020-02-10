'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import appConst from '../../../constants/appConst';
import forumConst from '../../../constants/forumConst';

export default class SearchForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchText: this.props.searchText || '',
            searchType: this.props.searchType || forumConst.searchTypes.channels,
        };

        this.changeData = this.changeData.bind(this);
        this.doSearch = this.doSearch.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {  //??todo
        debugger;
        if ((nextProps.searchText || nextProps.searchText === '') &&
            (this.state.searchText || this.state.searchText === '') &&
            (!nextState || !nextState.searchText) &&   //?
            (nextProps.searchText !== this.state.searchText)) {
                this.setState({searchText : nextProps.searchText});
        }
        if (nextProps.searchType && this.state.searchType && (nextProps.searchType !== this.state.searchType)) {
            this.setState({searchType : nextProps.searchType});
        }

        return true;

        // if (nextState &&
        //     ((nextState.searchText || nextState.searchText === '') && (nextState.searchText !== this.state.searchText) ||
        //     (nextState.searchType && (nextState.searchType !== this.state.searchType)))) {
        //         return true;
        // }

        // else {
        //     if ((nextProps.searchText || nextProps.searchText === '') && (this.state.searchText || this.state.searchText === '') && (nextProps.searchText !== this.state.searchText)) {
        //         this.setState({searchText : nextProps.searchText});
        //     }
        //     if (nextProps.searchType && this.state.searchType && (nextProps.searchType !== this.state.searchType)) {
        //         this.setState({searchType : nextProps.searchType});
        //     }

        //     return false;
        // }
    }

    // ввод данных
	changeData(event) {  //todo: вынести в utils
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    doSearch() {
        //todo: validate??

        this.props.doSearch(this.state.searchText, this.state.searchType);
    }

    render() {
        //console.log('render searchBar');
        const className = 'search-bar ' + (this.props.className ? this.props.className : '');
        
        return (
            <div className = {className}>
                <input 
                    name = "searchText"
                    type="text" 
                    className = '' 
                    maxLength = '30'
                    value = {this.state.searchText}
                    onChange = {this.changeData}
                />

                <select name="searchType" className = '' onChange = {this.changeData} value = {this.state.searchType}>
                    <option value={forumConst.searchTypes.channels}>{forumConst.searchTypes.channels}</option>
                    <option value={forumConst.searchTypes.messages}>{forumConst.searchTypes.messages}</option>
                </select>
                
                <Link to={`${appConst.searchLink}?searchText=${this.state.searchText}&searchType=${this.state.searchType}`}>
                    <button className = '' onClick = {this.doSearch}>
                        Поиск
                    </button>
                </Link>

            </div>
        )
    }
}