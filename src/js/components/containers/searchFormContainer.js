'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Promise from 'bluebird';
import { getSearchResults } from '../../api/searchApi';
import * as searchActions from '../../actions/searchActions';
import SearchForm from '../views/forms/searchForm';

class SearchFormContainer extends PureComponent {

    constructor(props) {
        super(props);

        this.searchType = '';
        this.searchText = '';

        this.resetSearchResults = this.resetSearchResults.bind(this);
        this.doSearch = this.doSearch.bind(this);
    }

    componentDidUpdate() {
        debugger;

        if (((this.props.searchText || this.props.searchText === '') && (this.searchText || this.searchText === '') && (this.props.searchText !== this.searchText)) ||
            (this.props.searchType && this.searchType && this.props.searchType !== this.searchType)) {

                this.doSearch(this.props.searchText, this.props.searchType);
        }
    }

    doSearch(searchText, searchType) {
        debugger;
        
        // if (searchType !== this.props.searchType) {
        //     this.searchType = searchType;
        //     this.props.setSearchType(searchType);
        // }
        // if (searchText !== this.searchText) {
        //     this.searchText = searchText;
        //     this.props.setSearchText(searchText);
        // }

        this.searchText = searchText;
        this.searchType = searchType;

        this.props.setSearchText(searchText);
        this.props.setSearchType(searchType);  //?

        this.resetSearchResults();

        return getSearchResults(searchText, searchType)
            .then(results => {
                debugger;
                return true;
            });
    }

    resetSearchResults() {
        if (this.props.searchChannels) {
            this.props.resetSearchChannels();
        }
        else if (this.props.searchMessages) {
            this.props.resetSearchMessages();
        }
    }
    
    render() {
        //console.log('render SearchFormContainer');
        debugger;

        return (
            <div className=''>
                <SearchForm
                    doSearch = {this.doSearch}
                    searchType = {this.props.searchType}
                    searchText = {this.props.searchText}
                />
            </div>
        );
    }
}

const mapStateToProps = function(store) {
    return {
        searchChannels: store.searchState.get('searchChannels'),
        searchMessages: store.searchState.get('searchMessages'),
        searchType: store.searchState.get('searchType'),
        searchText: store.searchState.get('searchText'),
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        resetSearchChannels: function() {
            dispatch(searchActions.setSearchChannels(null));
        },
        resetSearchMessages: function() {
            dispatch(searchActions.setSearchMessages(null));
        },
        setSearchText: function(data) {
            dispatch(searchActions.setSearchText(data));
        },
        setSearchType: function(data) {
            dispatch(searchActions.setSearchType(data));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFormContainer);