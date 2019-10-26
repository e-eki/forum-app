'use strict';

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Message from './message';

// Канал
export default class Channel extends PureComponent {

    render() {
        console.log('render channel');
        let className = 'channel ' + (this.props.className ? this.props.className : '');

        if (this.props.userInfo) {
            className += 'channel_transparent ';
        }

        debugger;

        let channel = <div></div>;
        const messages = [];
        let key = 0;

        if (this.props.data) {

            if (this.props.isCurrent && this.props.data.messages) {
                this.props.data.messages.forEach(function(item) {
                    const message = <Message
                                        key={key}
                                        data = {item}
                                    />;
                    messages.push(message);
                    key++;
                });
            }

            channel = <div>
                            {this.props.isCurrent
                                ?
                                this.props.data.name
                                :
                                <Link to={`/channels/${this.props.data.id}`}>{this.props.data.name}</Link> 
                            }
                            {/* <div>{this.props.data.description}</div> */}
                            <div>{this.props.isCurrent ? this.props.data.descriptionMessage : null}</div>
                            {this.props.isCurrent ? messages : null}
                        </div>;
        }
        
        return (
            <div className = {className}>
                {channel}
            </div>
        )
    }
}