'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Promise from 'bluebird';
import forumConst from '../../constants/forumConst';
import appConst from '../../constants/appConst';
import * as searchActions from '../../actions/searchActions';
import Channel from '../views/channel';
import Message from '../views/message';
import { getUserInfoAndSetCurrentUserInfo } from '../../api/userInfoApi';
import { setCurrentUserInfo } from '../../actions/userInfoActions';

// контейнер для результатов поиска по форуму
class SearchResultsContainer extends PureComponent {

    constructor(props) {
        super(props);

        // тип поиска
        this.searchType = '';
        // текст, по которому поиск
        this.searchText = '';
    }

    componentDidUpdate() {
        if (this.props.location && this.props.location.search) {
            const searchParams = new URLSearchParams(this.props.location.search);
            const searchText = searchParams.get("searchText");
            const searchType = searchParams.get("searchType");

            if (this.props.searchText !== searchText) {
                this.props.setSearchText(searchText);
            }
            if (this.props.searchType !== searchType) {
                this.props.setSearchType(searchType); 
            }
        }
    }
    
    render() {
        debugger;

        const items = [];
        let key = 0;

        if (this.props.searchChannels) {
            this.props.searchChannels.forEach(item => {
                const channel = <Channel
                                    channel = {item}
                                    type = {forumConst.itemTypes.searchChannel}
                                />;

                const searchResult = <div 
                                        key={key}
                                        className = 'search-result'
                                    >
                                        {channel}
                                    </div>;

                items.push(searchResult);
                key++;
            })
        }
        else if (this.props.searchMessages) {
            this.props.searchMessages.forEach(item => {
                const searchResultTitle = item.channelId
                                            ?
                                            <div className = 'search-result__title'>
                                                <Link to={`${appConst.channelsLink}/${item.channelId}`}>
                                                    <div>Перейти в чат</div>
                                                </Link>
                                            </div>
                                            :
                                            null;

                const message = <Message
                                    message = {item}
                                    type = {forumConst.itemTypes.searchMessage}
                                    showUserInfoById = {getUserInfoAndSetCurrentUserInfo}
                                />;

                const searchResult = <div
                                        className = 'search-result'
                                        key={key}
                                    >
                                        {searchResultTitle}
                                        {message}
                                    </div>;

                items.push(searchResult);
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
        searchType: store.searchState.get('searchType'),
        searchText: store.searchState.get('searchText'),
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
        resetCurrentUserInfo: function() {
            dispatch(setCurrentUserInfo(null));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsContainer);