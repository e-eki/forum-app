'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Promise from 'bluebird';
import { getSearchResults } from '../../api/searchApi';
import * as searchActions from '../../actions/searchActions';
import SearchForm from '../views/forms/searchForm';
import forumConst from '../../constants/forumConst';
import * as baseUtils from '../../utils/baseUtils';

// контейнер для формы поиска по форуму
class SearchFormContainer extends PureComponent {

    constructor(props) {
        super(props);

        // тип поиска
        this.searchType = '';
        // текст, по которому поиск
        this.searchText = '';

        this.resetSearchResults = this.resetSearchResults.bind(this);
        this.doSearch = this.doSearch.bind(this);
    }

    componentDidUpdate() {
        if (((this.props.searchText || this.props.searchText === '') && (this.searchText || this.searchText === '') && (this.props.searchText !== this.searchText)) ||
            (this.props.searchType && this.searchType && this.props.searchType !== this.searchType)) {

                this.doSearch(this.props.searchText, this.props.searchType);
        }
    }

    // поиск
    doSearch(searchText, searchType) {
        this.searchText = searchText;
        this.searchType = searchType;

        this.props.setSearchText(searchText);
        this.props.setSearchType(searchType);

        this.resetSearchResults();

        return getSearchResults(searchText, searchType)
            .then(results => {
                if (results) {
                    switch (searchType) {

                        case forumConst.searchTypes.channels:
                            this.props.setSearchChannels(results);
                            break;

                        case forumConst.searchTypes.messages:
                            this.props.setSearchMessages(results);
                            break;
                    }
                }
                
                return true;
            })
            .catch(error => {
                baseUtils.showErrorMessage(error);
                return false;
            })
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
        setSearchChannels: function(items) {
            dispatch(searchActions.setSearchChannels(items));
        },
        setSearchMessages: function(items) {
            dispatch(searchActions.setSearchMessages(items));
        },
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