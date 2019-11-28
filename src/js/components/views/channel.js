'use strict';

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Message from './message';
import ListForm from './forms/listForm';
import forumConst from '../../constants/forumConst';

// Канал
export default class Channel extends PureComponent {

    constructor(props) {
        super(props);

        this.showInfo = this.showInfo.bind(this);
    }

    showInfo() {
        debugger;
        const channelData = this.props.channel || this.props.privateChannel;
        this.props.setCurrentInfoChannel(channelData);
    }

    deleteChannel() {
        debugger;
        this.props.deleteChannel();  //todo!!!
    }

    render() {
        //console.log('render channel');
        let className = 'channel ' + (this.props.className ? this.props.className : '');

        debugger;

        // if (this.props.userInfo) {
        //     className += 'channel_transparent ';  //todo
        // }

        const channelData = this.props.channel || this.props.privateChannel;   //??todo
        const isPrivate = this.props.channel ? false : true;

        let channel = <div></div>;
        const messages = [];
        let key = 0;

        if (channelData) {

            if (channelData.messages) {
                channelData.messages.forEach(function(item) {
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
                channelNameBlock = channelData.name;
            }
            else {
                if (isPrivate) {
                    channelNameBlock = <Link to={`/private-channels/${channelData.id}`}>{channelData.name}</Link>;
                }
                else {
                    channelNameBlock = <Link to={`/channels/${channelData.id}`}>{channelData.name}</Link>;
                }
            }

            channel = <div>
                        {channelNameBlock}
                        
                        {(this.props.isCurrent && !isPrivate) ? <div>{channelData.description}</div> : null}

                        {this.props.isCurrent ? <div>{channelData.descriptionMessage}</div> : null}

                        {this.props.isCurrent
                            ?
                            <ListForm
                                type = {forumConst.itemTypes.message}
                                parentItemId = {channelData.id}
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

        if (!this.props.isCurrent) {
            if (!isPrivate) {
                channelInfoBlock = <button className = '' onClick = {this.showInfo}>
                                        Информация {channelData ? channelData.name : null}
                                    </button>;
            }
            else {
                channelInfoBlock = <button className = '' onClick = {this.showInfo}>
                                        Удалить диалог {this.channelData ? this.channelData.name : null}
                                    </button>;
            }

            //link to privateChannels
            // }
            
        }
        
        return (
            <div className = {className}>
                {channel}

                {channelInfoBlock}
            </div>
        )
    }
}