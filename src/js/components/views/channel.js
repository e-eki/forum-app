'use strict';

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Message from './message';

// Канал
export default class Channel extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        console.log('render channel');
        let className = 'channel ' + (this.props.className ? this.props.className : '');

        if (this.props.userInfo) {
            className += 'channel_transparent ';
        }

        let channel = <div></div>;
        const messages = [];
        let key = 0;

        const data = this.props.currentChannel || this.props.currentUserChannel;
        let channelName = null;
        let channelId = null;

        if (data) {
            if (this.props.currentChannel) {
                channelName = data.name;
                channelId = data.id;
            }
            else if (this.props.currentUserChannel) {
                channelName = data.userName;
                channelId = data.userId;
            }

            if (this.props.isCurrent && data.messages) {
                data.messages.forEach(function(item) {
                    const message = <Message
                                        key={key}
                                        data = {item}
                                        getUserInfo = {this.props.getUserInfo}
                                    />;
                    messages.push(message);
                    key++;
                }.bind(this));
            }
        }

        channel = <div>
                    {this.props.isCurrent
                        ?
                        channelName
                        :
                        <Link to={`/channels/${channelId}`}>{channelName}</Link> 
                    }

                    <div>
                        {this.props.isCurrent 
                            ? 
                            ((data && data.descriptionMessage) || null)
                            :
                            null
                        }
                    </div>

                    {this.props.isCurrent ? messages : null}
                </div>;
        
        return (
            <div className = {className}>
                {channel}
            </div>
        )
    }
}