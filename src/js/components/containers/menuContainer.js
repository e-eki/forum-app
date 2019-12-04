'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Menu from '../views/menu';

class MenuContainer extends PureComponent {

    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Menu
                newMessages = {this.props.newMessages}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        newMessages: store.notificationState.get('newMessages'),  //todo: check - reset нов.сообщений при переходе в личные сообщения
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        // resetAlertData: function() {
        //     dispatch(setAlertData(null));
        // },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);