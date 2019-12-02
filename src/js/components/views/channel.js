'use strict';

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Message from './message';
import ListForm from './forms/listForm';
import forumConst from '../../constants/forumConst';
import appConst from '../../constants/appConst';

// Канал
export default class Channel extends PureComponent {

    constructor(props) {
        super(props);

        this.showInfo = this.showInfo.bind(this);
        this.deleteChannel = this.deleteChannel.bind(this);
        this.showUserInfo = this.showUserInfo.bind(this);
    }

    showInfo() {
        debugger;
        //const channelData = this.props.channel || this.props.privateChannel;
        this.props.setCurrentInfoChannel(this.props.channel);
    }

    deleteChannel() {
        debugger;
        //const channelData = this.props.channel || this.props.privateChannel;
        this.props.deleteChannel(this.props.channel);
    }

    showUserInfo(event) {
        debugger;
        event.preventDefault();

        if (this.props.channel.recipientId) {
            this.props.showUserInfoById(this.props.channel.recipientId);
        }
    }

    render() {
        //console.log('render channel');
        let className = 'channel ' + (this.props.className ? this.props.className : '');

        debugger;

        // if (this.props.userInfo) {
        //     className += 'channel_transparent ';  //todo
        // }

        // const channelData = this.props.channel || this.props.privateChannel;   //??todo
        // const isPrivate = this.props.channel ? false : true;

        const isPrivate = this.props.type === forumConst.itemTypes.privateChannel;
        const isSearchResult = this.props.type === forumConst.itemTypes.searchChannel;

        let channel = <div></div>;
        const messages = [];
        let key = 0;

        if (this.props.channel) {

            if (this.props.channel.messages) {
                this.props.channel.messages.forEach(function(item) {
                    const message = <Message
                                        key={key}
                                        message = {item}
                                        showUserInfoById = {this.props.showUserInfoById}
                                    />;
                    messages.push(message);
                    key++;
                }.bind(this));
            }

            let channelNameBlock;
            
            if (this.props.isCurrent) {
                channelNameBlock = this.props.channel.name;
            }
            else {
                if (!isPrivate) {
                    channelNameBlock = <Link to={`${appConst.channelsLink}/${this.props.channel.id}`}>{this.props.channel.name}</Link>;
                }
                else {
                    channelNameBlock = <div>
                                            <Link to={`${appConst.privateChannelsLink}/${this.props.channel.id}`}>{this.props.channel.name}</Link>
                                            ----
                                            <Link to="/" onClick = {this.showUserInfo}>RECIPIENT</Link>
                                        </div>;
                }
            }

            channel = <div>
                        {channelNameBlock}
                        
                        {((this.props.isCurrent && !isPrivate) || isSearchResult) ? <div>{this.props.channel.description}</div> : null}

                        {this.props.isCurrent ? <div>{this.props.channel.descriptionMessage}</div> : null}

                        {this.props.isCurrent
                            ?
                            <ListForm
                                type = {forumConst.itemTypes.message}
                                parentItemId = {this.props.channel.id}
                                items = {messages}
                                currentInfoItem = {this.props.currentInfoMessage}
                                setCurrentInfoItem = {this.props.setCurrentInfoMessage}
                                modifiableItem = {this.props.modifiableMessage}
                                setModifiableItem = {this.props.setModifiableMessage}
                                modifyItem = {this.props.modifyMessage}
                                deleteItem = {this.props.deleteMessage}
                            />
                            :
                            messages
                        }
                    </div>;
        }

        let channelInfoBlock = null;

        if (this.props.isCurrent && isPrivate) {
            channelInfoBlock = <div>
                                    <button className = '' onClick = {this.deleteChannel}>
                                        Удалить диалог
                                    </button>

                                    <Link to={`${appConst.privateChannelsLink}`}>
                                        <button className = ''>Перейти в личные сообщения</button>
                                    </Link>
                                </div>;
        }
        else if (!this.props.isCurrent && !isPrivate && !isSearchResult) { 
            channelInfoBlock = <button className = '' onClick = {this.showInfo}>
                                    Информация {this.props.channel ? this.props.channel.name : null}
                                </button>;
        }
        
        return (
            <div className = {className}>
                {channel}

                {channelInfoBlock}
            </div>
        )
    }
}