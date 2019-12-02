'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import appConst from '../../../constants/appConst';
import forumConst from '../../../constants/forumConst';
import { getSearchResults } from '../../../api/searchApi';  //вынести и передавать через контейнер !todo

export default class SearchForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: '',
            searchType: forumConst.searchTypes.channels,
        };

        this.changeData = this.changeData.bind(this);
        this.resetState = this.resetState.bind(this);
        this.doSearch = this.doSearch.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true; //todo??
    }

    // ввод данных
	changeData(event) {
        debugger;
		const dataName = event.target.name;

		this.state[`${dataName}`] = event.target.value;
		this.setState({});
    }

    resetState() {
        // this.state.text = '';
        // this.state.searchType = forumConst.searchTypes.channels;

        // this.setState({});
    }

    doSearch() {
        debugger;
        //validate??

        return getSearchResults(this.state.text, this.state.searchType)
            .then(results => {
                return true;
            });
    }

    render() {
        //console.log('render searchBar');
        const className = 'search-bar ' + (this.props.className ? this.props.className : '');
        
        return (
            <div className = {className}>
                <input 
                    name = "text"
                    type="text" 
                    className = '' 
                    maxLength = '30'
                    value = {this.state.text}
                    onChange = {this.changeData}
                />

                <select name="searchType" className = '' onChange = {this.changeData} value = {this.state.searchType}>
                    <option value={forumConst.searchTypes.channels}>{forumConst.searchTypes.channels}</option>
                    <option value={forumConst.searchTypes.messages}>{forumConst.searchTypes.messages}</option>
                </select>
                
                <Link to={`${appConst.searchLink}?text=${this.state.text}&searchType=${this.state.searchType}`}>
                    <button className = '' onClick = {this.doSearch}>
                        Поиск
                    </button>
                </Link>

            </div>
        )
    }
}