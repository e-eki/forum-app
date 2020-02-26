'use strict';

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Message from './message';
import ListForm from './forms/listForm';
import forumConst from '../../constants/forumConst';
import appConst from '../../constants/appConst';
import { getDateTimeString } from '../../utils/dateStringUtils';
import NewMessagesNotificationForm from './forms/newMessagesNotificationForm';

// чат
export default class Channel extends PureComponent {

    constructor(props) {
        super(props);

        this.showInfo = this.showInfo.bind(this);
        this.deleteChannel = this.deleteChannel.bind(this);
        this.showUserInfo = this.showUserInfo.bind(this);
    }

    // показать информацию и элементы управления чатом
    showInfo() {
        this.props.setCurrentInfoChannel(this.props.channel);
    }

    // удалить чат
    deleteChannel() {
        this.props.deleteChannel(this.props.channel);
    }

    // показать информацию юзера - отправителя чата
    showUserInfo(event) {
        event.preventDefault();

        if (this.props.channel.senderId) {
            this.props.showUserInfoById(this.props.channel.senderId);
        }
    }

    render() {
        const className = 'channel forum-item ' + (this.props.className ? this.props.className : '');

        debugger;

        // является ли чат личным
        const isPrivate = this.props.type === forumConst.itemTypes.privateChannel;
        // отображается ли чат в списке результатов поиска
        const isSearchResult = this.props.type === forumConst.itemTypes.searchChannel;

        let channel = <div></div>;
        const messages = [];
        let key = 0;

        if (this.props.channel) {

            if (this.props.channel.messages) {
                //todo: сделать группировку сообщений по датам здесь или на сервере
                
                this.props.channel.messages.forEach(function(item) {
                    const message = <Message
                                        key={key}
                                        message = {item}
                                        showUserInfoById = {this.props.showUserInfoById}
                                        setCurrentInfoMessage = {this.props.setCurrentInfoMessage}
                                    />;
                    messages.push(message);
                    key++;
                }.bind(this));
            }

            // наименование чата
            let channelNameBlock;

            // последнее сообщение в чате
            let lastMessageBlock;

            // кол-во новых сообщений в чате
            let newMessagesNotificationBlock;

            // закрепленное в чате сообщение
            let descriptionMessage = null;

            // открепить закрепленное сообщение
            let resetDescriptionMessageBlock = null;

            const channelName = this.props.channel.name || 'NoName channel';

            const descriptionBlock = this.props.channel.description
                                    ?
                                    <div className = 'forum-item__description'>
                                        {this.props.channel.description}
                                    </div>
                                    :
                                    null;

            // {isPrivate ? <Link to="/" onClick = {this.showUserInfo}>Отправитель</Link> : null
            const senderNameBlock = (!this.props.isCurrent && isPrivate)
                                    ?
                                    <div className = 'user-info__login'>
                                        <Link to="/" onClick = {this.showUserInfo}>Отправитель</Link>
                                    </div>
                                    :
                                    null;    
            
            if (this.props.isCurrent) {
                channelNameBlock = channelName;

                if (this.props.channel.descriptionMessage) {
                    //const descriptionMessage = this.props.channel.descriptionMessage;

                    descriptionMessage = <Message
                                                message = {this.props.channel.descriptionMessage}
                                                showUserInfoById = {this.props.showUserInfoById}
                                            />

                    resetDescriptionMessageBlock = this.props.channel.canEdit
                                                            ?
                                                            <div>
                                                                <button className = '' onClick = {this.props.resetDescriptionMessage}>
                                                                    Открепить
                                                                </button>
                                                            </div>
                                                            :
                                                            null;

                    // descriptionMessageBlock = <div>
                    //                                 <div className = 'user-info__login'>
                    //                                     {descriptionMessage.senderName || 'NoName'}
                    //                                 </div>
                    //                                 <div className = 'message__text'>
                    //                                     {descriptionMessage.text || ''}
                    //                                 </div>

                    //                                 {resetDescriptionMessageBlock}
                    //                             </div>;
                }
            }
            else {
                const channelsLink = (!isPrivate) ? appConst.channelsLink : appConst.privateChannelsLink;

                channelNameBlock = <Link to={`${channelsLink}/${this.props.channel.id}`}>
                                        {channelName}
                                    </Link>;

                if (this.props.channel.lastMessage) {
                    let text = this.props.channel.lastMessage.text;

                    if (text && (text.length > forumConst.lastMessageTextLength)) {
                        text = `${text.slice(0, forumConst.lastMessageTextLength)}...`
                    }

                    const dateString = getDateTimeString(this.props.channel.lastMessage.date);

                    const senderName = this.props.channel.lastMessage.senderName || 'NoName';

                    lastMessageBlock = <div className = 'channel__last-message'>
                                            <span className = 'user-info__login'>{senderName}: </span>
                                            <span className = 'message__text message_preview'>{text}...</span>
                                            <span className = 'message__date message_preview message_date-preview'>{dateString}</span>
                                        </div>;
                }

                if (this.props.channel.newMessagesCount) {
                    newMessagesNotificationBlock = <NewMessagesNotificationForm
                                                        newMessagesCount = {this.props.channel.newMessagesCount}
                                                    />
                }
            }

            channel = <div>
                        <div className = 'forum-item__title'>
                            {channelNameBlock}
                        </div>
                        
                        {/* <div className = 'forum-item__description'>
                            {((this.props.isCurrent && !isPrivate) || isSearchResult)
                                ?
                                <div>{this.props.channel.description}</div>
                                :
                                null
                            }
                        </div> */}

                        {descriptionBlock}

                        {senderNameBlock}
                        
                        <div className = 'channel__description-message'>
                            {descriptionMessage}

                            {resetDescriptionMessageBlock}
                        </div>

                        {this.props.isCurrent
                            ?
                            <ListForm
                                canAdd = {this.props.channel ? this.props.channel.canAdd : false}
                                type = {forumConst.itemTypes.message}
                                parentItemId = {this.props.channel.id}
                                recipientId = {this.props.channel.recipientId}
                                items = {messages}
                                currentInfoItem = {this.props.currentInfoMessage}
                                setCurrentInfoItem = {this.props.setCurrentInfoMessage}
                                modifiableItem = {this.props.modifiableMessage}
                                movingItem = {this.props.movingMessage}
                                setModifiableItem = {this.props.setModifiableMessage}
                                setMovingItem = {this.props.setMovingMessage}
                                modifyItem = {this.props.modifyMessage}
                                deleteItem = {this.props.deleteMessage}
                                newMessagesCount = {this.props.channel.newMessagesCount}
                                setDescriptionMessage = {this.props.setDescriptionMessage}
                                deletedItemAction = {this.props.deleteMessageById}

                                parentItemsList = {this.props.parentItemsList}
                                resetParentItemsList = {this.props.resetParentItemsList}

                                colorTheme = {this.props.colorTheme}
                            />
                            :
                            <div className = 'channel__messages-preview'>
                                {lastMessageBlock}
                                
                                {newMessagesNotificationBlock}
                            </div>
                        }
                    </div>;
        }

        // информация и элементы управления чатом
        let channelInfoBlock = null;

        if (this.props.isCurrent &&
            isPrivate) {
                let deletePrivateChannelBlock = null;

                if (this.props.channel && this.props.channel.canDelete) {
                    deletePrivateChannelBlock = <button className = '' onClick = {this.deleteChannel}>
                                                    Удалить диалог
                                                </button>;
                }

                channelInfoBlock = <div>
                                        {deletePrivateChannelBlock}

                                        <Link to={`${appConst.privateChannelsLink}`}>
                                            <button className = ''>Перейти в личные сообщения</button>
                                        </Link>
                                    </div>;
        }
        else if (!this.props.isCurrent &&
                !isPrivate &&
                !isSearchResult &&
                (this.props.channel && (this.props.channel.canEdit || this.props.channel.canDelete))) { 
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