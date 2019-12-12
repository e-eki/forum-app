'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Menu from '../views/menu';
import { getPrivateChannels } from '../../api/privateChannelApi';
import { setNewPrivateMessagesCount } from '../../actions/notificationActions';

class MenuContainer extends PureComponent {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        debugger;

        //if (user.id)   //todo!
        return getPrivateChannels()
            .then(privateChannels => {
                debugger;
                let newPrivateMessagesCount = 0;

                if (privateChannels && privateChannels.length) {
                    privateChannels.forEach(item => {  //?todo: reduce
                        newPrivateMessagesCount += (item.newMessagesCount || 0);
                    })

                    this.props.setNewPrivateMessagesCount(newPrivateMessagesCount);
                }

                return true;
            });
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
        setNewPrivateMessagesCount: function(data) {
            dispatch(setNewPrivateMessagesCount(data));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);