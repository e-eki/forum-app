'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Menu from '../views/menu';

class MenuContainer extends PureComponent {

    constructor(props) {
        super(props);
    }
    
    render() {
        debugger;

        return (
            <Menu
                newPrivateMessagesCount = {this.props.newPrivateMessagesCount}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        newPrivateMessagesCount: store.notificationState.get('newPrivateMessagesCount'),  //todo: check - reset нов.сообщений при переходе в личные сообщения
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        //
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);