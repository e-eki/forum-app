'use strict';

import Promise from 'bluebird';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Menu from '../views/menu';
import { getPrivateChannels } from '../../api/privateChannelApi';
import { setNewPrivateMessagesCount } from '../../actions/notificationActions';
import { setAlertData } from '../../actions/alertDataActions';
import * as baseUtils from '../../utils/baseUtils';
import appConst from '../../constants/appConst';
import forumConst from '../../constants/forumConst';
import { getActualAccessToken, logout } from '../../api/authApi';
import { getUserInfoAndSetCurrentUserInfo } from '../../api/userInfoApi';
import { isAccessTokenExpired } from '../../utils/authUtils';
import { setColorTheme } from '../../actions/colorThemeActions';

// контейнер для меню
class MenuContainer extends PureComponent {

    constructor(props) {
        super(props);

        this.setNewPrivateMessagesCount = this.setNewPrivateMessagesCount.bind(this);
        this.doLogout = this.doLogout.bind(this);
        this.showUserInfo = this.showUserInfo.bind(this);
        this.changeColorTheme = this.changeColorTheme.bind(this);
        this.getColorThemeButtonTitle = this.getColorThemeButtonTitle.bind(this);
    }

    componentDidMount() {
        debugger;
        return this.setNewPrivateMessagesCount()
            .then(result => true);
    }

    // получить кол-во новых личных сообщений (для уведомления в меню)
    // !!! здесь же происходит рефреш токенов, если он нужен
    setNewPrivateMessagesCount() {
        debugger;

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
            })
            .catch(error => {
                //baseUtils.showErrorMessage(error);  //?
                return false;
            })
    }

    // показать информацию юзера (личный кабинет)
    showUserInfo() {
        debugger;

        return getUserInfoAndSetCurrentUserInfo(null, true)
            .then(result => true)
            .catch(error => {
                baseUtils.showErrorMessage(error);
                return false;
            })
    }

    // разлогиниться на форуме
    doLogout() {
        debugger;

        return logout()
			.then(response => {
                debugger;

                const alertData = {
                    message: 'Вы успешно разлогинились. Нажмите ссылку для перехода.',
                    secondaryMessage: 'На главную',
                    secondaryLink: appConst.defaultLink,
                };

                this.props.setAlertData(alertData);

                return true;
			})
			.catch(error => {
                const message = baseUtils.getErrorResponseMessage(error);

                const alertData = {
                    message: message,
                    secondaryMessage: 'На главную',
                    secondaryLink: appConst.defaultLink,
                };

				this.props.setAlertData(alertData);
			})
    }

    // изменение темы оформления
    changeColorTheme() {
        debugger;

        switch (this.props.colorTheme) {
            case forumConst.colorThemes.day:
                this.props.setColorTheme(forumConst.colorThemes.night);
                this.props.changePageColorTheme(forumConst.colorThemes.night);
                break;

            case forumConst.colorThemes.night:
                this.props.setColorTheme(forumConst.colorThemes.day);
                this.props.changePageColorTheme(forumConst.colorThemes.day);
                break;
        
            default:
                this.props.setColorTheme(forumConst.colorThemes.night);
                this.props.changePageColorTheme(forumConst.colorThemes.night);
                break;
        }
    }

    // получить название кнопки для переключения темы оформления
    getColorThemeButtonTitle() {
        debugger;
        let title;

        switch (this.props.colorTheme) {
            case forumConst.colorThemes.day:
              title = forumConst.colorThemeTitles.night;
              break;

            case forumConst.colorThemes.night:
                title = forumConst.colorThemeTitles.day;
                break;
        
            default:
                title = forumConst.colorThemeTitles.night;
                break;
        }

        return title;
    }
    
    render() {
        debugger;
        const colorThemeTitle = this.getColorThemeButtonTitle();

        return (
            <Menu
                newPrivateMessagesCount = {this.props.newPrivateMessagesCount}
                doLogout = {this.doLogout}
                showUserInfo = {this.showUserInfo}
                isAccessTokenExpired = {isAccessTokenExpired}
                colorThemeTitle = {colorThemeTitle}
                changeColorTheme = {this.changeColorTheme}

                accessToken = {this.props.accessToken}  // чтобы компонент перерисовывался при изменении токенов
                accessTokenExpiresIn = {this.props.accessTokenExpiresIn}
                // userRole = {this.props.userRole}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        accessToken: store.authState.get('accessToken'),   // чтобы компонент перерисовывался при изменении токенов
        accessTokenExpiresIn: store.authState.get('accessTokenExpiresIn'),
        // userRole: store.authState.get('userRole'),
        colorTheme: store.colorThemeState.get('colorTheme'),

        newPrivateMessagesCount: store.notificationState.get('newPrivateMessagesCount'),  
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        setAlertData: function(data) {
            dispatch(setAlertData(data));
        },
        setNewPrivateMessagesCount: function(data) {
            dispatch(setNewPrivateMessagesCount(data));
        },
        setColorTheme: function(data) {
            dispatch(setColorTheme(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);