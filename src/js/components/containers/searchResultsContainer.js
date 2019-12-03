'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Promise from 'bluebird';
import forumConst from '../../constants/forumConst';
import * as searchActions from '../../actions/searchActions';
import Channel from '../views/channel';
import Message from '../views/message';

class SearchResultsContainer extends PureComponent {

    constructor(props) {
        super(props);

        this.searchType = '';
        this.searchText = '';
    }

    componentDidUpdate() {
        debugger;
        
        // if (this.props.location && this.props.location.search) {
        //     const searchParams = new URLSearchParams(this.props.location.search);
        //     const searchText = searchParams.get("searchText");
        //     const searchType = searchParams.get("searchType");

        //     if (searchText && searchType &&
        //         (searchText !== this.searchText ||
        //         searchType !== this.searchType)) {

        //         this.searchText = searchText;
        //         this.searchType = searchType;

        //         return getSearchResults(searchText, searchType)
        //             .then(results => {
        //                 return true;
        //             });
        //     }
        // }

        if (this.props.location && this.props.location.search) {
            const searchParams = new URLSearchParams(this.props.location.search);
            const searchText = searchParams.get("searchText");
            const searchType = searchParams.get("searchType");

            this.props.setSearchText(searchText);
            this.props.setSearchType(searchType);  //?
        }
    }
    
    render() {
        //console.log('render SearchContainer');
        debugger;

        const items = [];
        let key = 0;

        if (this.props.searchChannels) {
            this.props.searchChannels.forEach(item => {
                const channel = <Channel
                                    key={key}
                                    channel = {item}
                                    type = {forumConst.itemTypes.searchChannel}
                                />;
                items.push(channel);
                key++;
            })
        }
        else if (this.props.searchMessages) {
            this.props.searchMessages.forEach(item => {
                const message = <Message
                                    key={key}
                                    message = {item}
                                    type = {forumConst.itemTypes.searchMessage}
                                />;
                items.push(message);  //todo! message - проверка на search
                key++;
            })
        }

        return (
            <div className=''>
                {items.length ? items : 'Нет результатов'}
            </div>
        );
    }
}

const mapStateToProps = function(store) {
    return {
        searchChannels: store.searchState.get('searchChannels'),
        searchMessages: store.searchState.get('searchMessages'),
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        setSearchText: function(data) {
            dispatch(searchActions.setSearchText(data));
        },
        setSearchType: function(data) {
            dispatch(searchActions.setSearchType(data));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsContainer);