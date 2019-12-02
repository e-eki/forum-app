'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Promise from 'bluebird';
// import { getChannelsByText } from '../../api/channelApi';
// import { getMessagesByText } from '../../api/messageApi';
import { getSearchResults } from '../../api/searchApi';
import forumConst from '../../constants/forumConst';
import * as searchActions from '../../actions/searchActions';
import Channel from '../views/channel';
import Message from '../views/message';

class SearchResultsContainer extends PureComponent {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        debugger;
        if (this.props.location && this.props.location.search) {
            const searchParams = new URLSearchParams(this.props.location.search);
            const text = searchParams.get("text");
            const searchType = searchParams.get("searchType");

            if (text && searchType) {
                return getSearchResults(text, searchType)
                    .then(results => {
                        return true;
                    });
            }
        }
    }

    componentWillUnmount() {  //??
        debugger;

        if (this.props.searchChannels) {
            this.props.resetSearchChannels();
        }
        else if (this.props.searchMessages) {
            this.props.resetSearchMessages();
        }
    }
    
    render() {
        //console.log('render SearchContainer');

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
        resetSearchChannels: function() {
            dispatch(searchActions.setSearchChannels(null));
        },
        resetSearchMessages: function() {
            dispatch(searchActions.setSearchMessages(null));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsContainer);