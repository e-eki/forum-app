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
                newMessagesCount = {this.props.newMessagesCount}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        newMessagesCount: store.notificationState.get('newMessagesCount'),  //todo: check - reset нов.сообщений при переходе в личные сообщения
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        //
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);