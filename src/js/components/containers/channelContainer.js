'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import forumConst from '../../constants/forumConst';
import Channel from '../views/channel';
import { setCurrentUserInfo } from '../../actions/userInfoActions';
import { getChannelById, getChannels } from '../../api/channelApi';
import { getUserInfoAndSetCurrentUserInfo } from '../../api/userInfoApi';
import * as messageApi from '../../api/messageApi';
import { setModifiableMessage, setCurrentInfoMessage, setMovingMessage } from '../../actions/messageActions';
import { joinRoom, leaveRoom, deleteMessageById } from '../../actions/remoteActions';
import { setCurrentChannel } from '../../actions/channelActions';
import { setDescriptionMessageForChannel } from '../../utils/channelUtils';
import { setParentItemsList } from '../../actions/modifyingActions';
import * as baseUtils from '../../utils/baseUtils';
import { getUserId } from '../../utils/authUtils';

// контейнер для чата
class ChannelContainer extends PureComponent {

    constructor(props) {
        super(props);

        // id чата
        this.channelId = null;
        // тип комнаты (для отправки на сервер события)
        this.roomType = forumConst.itemTypes.channel;

        this.getChannel = this.getChannel.bind(this);
        this.setDescriptionMessage = this.setDescriptionMessage.bind(this);
        this.resetDescriptionMessage = this.resetDescriptionMessage.bind(this);
    }

    componentDidMount() {
        return this.getChannel();
    }

    componentWillUnmount() {
        // при уходе со страницы чата отправляем на сервер событие о выходе из комнаты с id чата
        if (this.channelId) {
            const userId = getUserId();
            this.props.leaveRoom(this.channelId, this.roomType, userId);
        }

        // и больше не показываем отображаемую информацию юзера
        if (this.props.currentUserInfo) {
            this.props.resetCurrentUserInfo();
        }

        this.props.resetCurrentChannel();
        this.props.setParentItemsList(null);
    }

    componentDidUpdate(prevProps) {
        // если изменились данные токенов, могли измениться доступные элементы управления, перерисоваем изменившиеся
        if (this.props.accessToken !== prevProps.accessToken  ||
            this.props.userRole !== prevProps.userRole) {
                return this.getChannel();
        }

        // если сообщение в чате выбрано для перемещения, то нужно установить список чатов (для перемещения в нем)
        if (this.props.movingMessage &&
            !this.props.parentItemsList) {
                return getChannels()
                    .then(channels => {
                        this.props.setParentItemsList(channels || []);
                    })
                    .catch(error => {
                        baseUtils.showErrorMessage(error);
                        return false;
                    })
        }
    }

    // получить текущий чат
    getChannel() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            const channelId = this.props.match.params.id;

            return getChannelById(channelId)
                .then(channel => {
                    if (channel && channel.id) {
                        const userId = getUserId();

                        // отправляем на сервер событие о присоединении к комнате с id чата
                        this.props.joinRoom(channel.id, this.roomType, userId);
                        this.channelId = channel.id;

                        // устанавливаем текущий чат
                        this.props.setCurrentChannel(channel);
                    }

                    return true;
                })
                .catch(error => {
                    baseUtils.showErrorMessage(error);
                    return false;
                })
        }
        else {
            return false;
        }
    }

    // закрепить сообщение в чате
    setDescriptionMessage(message) {
        return setDescriptionMessageForChannel(forumConst.itemTypes.channel, message, this.props.currentChannel)
            .then(result => true)
            .catch(error => {
                baseUtils.showErrorMessage(error);
                return false;
            })
    }

    // открепить сообщение в чате
    resetDescriptionMessage() {
        return setDescriptionMessageForChannel(forumConst.itemTypes.channel, null, this.props.currentChannel)
            .then(result => true)
            .catch(error => {
                baseUtils.showErrorMessage(error);
                return false;
            })
    }
    
    render() {
        debugger;

        return (
            <div>
                <Channel
                    channel = {this.props.currentChannel}
                    type = {forumConst.itemTypes.channel}
                    isCurrent = {true}

                    currentInfoMessage = {this.props.currentInfoMessage}
                    modifiableMessage = {this.props.modifiableMessage}
                    movingMessage = {this.props.movingMessage}
                    setCurrentInfoMessage = {this.props.setCurrentInfoMessage}
                    setModifiableMessage = {this.props.setModifiableMessage}
                    setMovingMessage = {this.props.setMovingMessage}
                    modifyMessage = {messageApi.modifyMessage}
                    deleteMessage = {messageApi.deleteMessage}
                    showUserInfoById = {getUserInfoAndSetCurrentUserInfo}
                    setDescriptionMessage = {this.setDescriptionMessage}
                    resetDescriptionMessage = {this.resetDescriptionMessage}
                    deleteMessageById = {this.props.deleteMessageById}

                    parentItemsList = {this.props.parentItemsList}
                    resetParentItemsList = {this.props.resetParentItemsList}

                    colorTheme = {this.props.colorTheme}
                />
            </div>
        );
    }
}

const mapStateToProps = function(store) {
    return {  
        currentChannel: store.channelState.get('currentChannel'),
        currentInfoMessage: store.messageState.get('currentInfoMessage'),
        modifiableMessage: store.messageState.get('modifiableMessage'),
        movingMessage: store.messageState.get('movingMessage'),
        parentItemsList: store.modifyingState.get('parentItemsList'),
        //userId: store.authState.get('userId'),
        currentUserInfo: store.userInfoState.get('currentUserInfo'),

        accessToken: store.authState.get('accessToken'),
        userRole: store.authState.get('userRole'),

        colorTheme: store.forumDesignState.get('colorTheme'),
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        setCurrentChannel: function(item) {
            dispatch(setCurrentChannel(item));
        },
        resetCurrentChannel: function() {
            dispatch(setCurrentChannel(null));
        },
        resetCurrentUserInfo: function() {
            dispatch(setCurrentUserInfo(null));
        },
        setModifiableMessage: function(item) {
            dispatch(setModifiableMessage(item));
        },
        setMovingMessage: function(item) {
            dispatch(setMovingMessage(item));
        },
        setCurrentInfoMessage: function(item) {
            dispatch(setCurrentInfoMessage(item));
        },
        setParentItemsList: function(items) {
            dispatch(setParentItemsList(items));
        },
        resetParentItemsList: function() {
            dispatch(setParentItemsList(null));
        },
        joinRoom: function(id, roomType, userId) {
            dispatch(joinRoom(id, roomType, userId));
        },
        leaveRoom: function(id, roomType, userId) {
            dispatch(leaveRoom(id, roomType, userId));
        },
        deleteMessageById: function(messageId, channelId) {
            dispatch(deleteMessageById(messageId, channelId));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelContainer);