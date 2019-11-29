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
        this.deleteChannel = this.deleteChannel.bind(this);
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
                if (isPrivate) {
                    channelNameBlock = <Link to={`/private-channels/${this.props.channel.id}`}>{this.props.channel.name}</Link>;
                }
                else {
                    channelNameBlock = <Link to={`/channels/${this.props.channel.id}`}>{this.props.channel.name}</Link>;
                }
            }

            channel = <div>
                        {channelNameBlock}
                        
                        {(this.props.isCurrent && !isPrivate) ? <div>{this.props.channel.description}</div> : null}

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

        if (!this.props.isCurrent) {
            if (!isPrivate) {
                channelInfoBlock = <button className = '' onClick = {this.showInfo}>
                                        Информация {this.props.channel ? this.props.channel.name : null}
                                    </button>;
            }
            else {
                channelInfoBlock = <div>
                                        <button className = '' onClick = {this.deleteChannel}>
                                            Удалить диалог с {this.props.channel ? this.props.channel.name : null}
                                        </button>

                                        <Link to={`/private-channels`}>
                                            <button className = ''>Перейти в личные сообщения</button>
                                        </Link>
                                    </div>;
            }
        }
        
        return (
            <div className = {className}>
                {channel}

                {channelInfoBlock}
            </div>
        )
    }
}