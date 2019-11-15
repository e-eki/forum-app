'use strict';

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Message from './message';
import ListForm from './forms/listForm';

// Канал
export default class Channel extends PureComponent {

    constructor(props) {
        super(props);

        this.showInfo = this.showInfo.bind(this);
    }

    showInfo() {
        debugger;
        this.props.setCurrentInfoChannel(this.props.channel);
    }

    render() {
        //console.log('render channel');
        let className = 'channel ' + (this.props.className ? this.props.className : '');

        if (this.props.userInfo) {
            className += 'channel_transparent ';  //todo
        }

        let channel = <div></div>;
        const messages = [];
        let key = 0;

        if (this.props.channel) {

            if (this.props.channel.messages) {
                this.props.channel.messages.forEach(function(item) {
                    const message = <Message
                                        key={key}
                                        message = {item}
                                    />;
                    messages.push(message);
                    key++;
                }.bind(this));
            }

            channel = <div>
                        {this.props.isCurrent 
                            ?
                            this.props.channel.name
                            :
                            <Link to={`/channels/${this.props.channel.id}`}>{this.props.channel.name}</Link>
                        }
                        
                        {this.props.isCurrent ? <div>{this.props.channel.description}</div> : null}

                        {this.props.isCurrent ? <div>{this.props.channel.descriptionMessage}</div> : null}

                        {this.props.isCurrent
                            ?
                            <ListForm
                                type = 'message'
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
        channelInfoBlock = <button className = '' onClick = {this.showInfo}>
                                Информация {this.props.channel.name ? this.props.channel.name : null}
                            </button>;
    }
    
    return (
        <div className = {className}>
            {channel}

            {channelInfoBlock}
        </div>
    )

        // const data = this.props.currentChannel || this.props.currentUserChannel;
        // let channelName = null;
        // let channelId = null;

        // if (data) {
        //     if (this.props.currentChannel) {
        //         channelName = data.name;
        //         channelId = data.id;
        //     }
        //     else if (this.props.currentUserChannel) {
        //         channelName = data.userName;
        //         channelId = data.userId;
        //     }

        //     if (this.props.isCurrent && data.messages) {
        //         data.messages.forEach(function(item) {
        //             const message = <Message
        //                                 key={key}
        //                                 data = {item}
        //                                 getUserInfo = {this.props.getUserInfo}
        //                             />;
        //             messages.push(message);
        //             key++;
        //         }.bind(this));
        //     }
        // }

        // channel = <div>
        //             {this.props.isCurrent
        //                 ?
        //                 channelName
        //                 :
        //                 <Link to={`/channels/${channelId}`}>{channelName}</Link> 
        //             }

        //             <div>
        //                 {this.props.isCurrent 
        //                     ? 
        //                     ((data && data.descriptionMessage) || null)
        //                     :
        //                     null
        //                 }
        //             </div>

        //             {this.props.isCurrent ? messages : null}
        //         </div>;
        
        // return (
        //     <div className = {className}>
        //         {channel}
        //     </div>
        // )
    }
}