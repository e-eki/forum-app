'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Promise from 'bluebird';
import forumConst from '../../constants/forumConst';
import * as searchActions from '../../actions/searchActions';
import Channel from '../views/channel';
import Message from '../views/message';
import { getUserInfoAndSetCurrentUserInfo } from '../../api/userInfoApi';
import { setCurrentUserInfo } from '../../actions/userInfoActions';

class SearchResultsContainer extends PureComponent {

    constructor(props) {
        super(props);

        this.searchType = '';
        this.searchText = '';
    }

    componentDidUpdate() {
        debugger;

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
        //console.log('render SearchResultsContainer');
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
                                    showUserInfoById = {getUserInfoAndSetCurrentUserInfo}
                                />;
                items.push(message);
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
        currentUserInfo: store.userInfo.get('currentUserInfo'),
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