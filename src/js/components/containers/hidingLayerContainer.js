'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import HidingLayer from '../views/hidingLayer';

// контейнер для слоя, скрывающего основной контент и делающего его неактивным
// в случае, когда показано всплывающее окно
class HidingLayerContainer extends PureComponent {

    constructor(props) {
        super(props);
    }
    
    render() {
        debugger;

        // всплывающее окно показано, если:
                                // есть оповещение для юзера
        const isPopupFormShown = this.props.alertData ||
                                // информация юзера открыта для просмотра/редактирования
                                this.props.currentUserInfo || this.props.modifiableUserInfo ||
                                // информация раздела открыта для просмотра/редактирования/перемещения
                                this.props.currentInfoSection || this.props.modifiableSection || this.props.movingSection ||
                                // информация подраздела открыта для просмотра/редактирования/перемещения
                                this.props.currentInfoSubSection || this.props.modifiableSubSection || this.props.modifiableSubSection ||
                                // информация чата открыта для просмотра/редактирования/перемещения
                                this.props.currentInfoChannel || this.props.modifiableChannel || this.props.movingChannel ||
                                // информация сообщения открыта для просмотра/редактирования/перемещения
                                this.props.currentInfoMessage || this.props.modifiableMessage || this.props.movingMessage;


        const hidingLayer = isPopupFormShown
                            ?
                            <HidingLayer/>
                            :
                            null;

        return (
            <div>{hidingLayer}</div>
        );
    }
}

const mapStateToProps = function(store) {
    return {
        alertData: store.alertDataState.get('alertData'),

        currentUserInfo: store.userInfoState.get('currentUserInfo'),
        modifiableUserInfo: store.userInfoState.get('modifiableUserInfo'),

        currentInfoSection: store.sectionState.get('currentInfoSection'),
        modifiableSection: store.sectionState.get('modifiableSection'),
        movingSection: store.sectionState.get('movingSection'),

        currentInfoSubSection: store.subSectionState.get('currentInfoSubSection'),
        modifiableSubSection: store.subSectionState.get('modifiableSubSection'),
        movingSubSection: store.subSectionState.get('movingSubSection'),

        currentInfoChannel: store.channelState.get('currentInfoChannel'),
        modifiableChannel: store.channelState.get('modifiableChannel'),
        movingChannel: store.channelState.get('movingChannel'),

        currentInfoMessage: store.messageState.get('currentInfoMessage'),
        modifiableMessage: store.messageState.get('modifiableMessage'),
        movingMessage: store.messageState.get('movingMessage'),
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        //?
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HidingLayerContainer);