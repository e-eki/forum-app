'use strict';

//---Section actions
export const SET_SECTIONS = 'SET_SECTIONS';
export const SET_CURRENT_SECTION = 'SET_CURRENT_SECTION';
export const SET_CURRENT_INFO_SECTION = 'SET_CURRENT_INFO_SECTION';
export const SET_MODIFIABLE_SECTION = 'SET_MODIFIABLE_SECTION';
export const SET_MOVING_SECTION = 'SET_MOVING_SECTION';

//---SubSection actions
export const SET_CURRENT_SUBSECTION = 'SET_CURRENT_SUBSECTION';
export const SET_CURRENT_INFO_SUBSECTION = 'SET_CURRENT_INFO_SUBSECTION';
export const SET_MODIFIABLE_SUBSECTION = 'SET_MODIFIABLE_SUBSECTION';
export const SET_MOVING_SUBSECTION = 'SET_MOVING_SUBSECTION';

//---Channel actions
export const SET_CURRENT_CHANNEL = 'SET_CURRENT_CHANNEL';
export const SET_CURRENT_INFO_CHANNEL = 'SET_CURRENT_INFO_CHANNEL';
export const SET_MODIFIABLE_CHANNEL = 'SET_MODIFIABLE_CHANNEL';
export const SET_MOVING_CHANNEL = 'SET_MOVING_CHANNEL';

//--PrivateChannel actions
export const SET_CURRENT_PRIVATE_CHANNEL = 'SET_CURRENT_PRIVATE_CHANNEL';
export const SET_PRIVATE_CHANNELS = 'SET_PRIVATE_CHANNELS';

//---Message actions
export const SET_CURRENT_INFO_MESSAGE = 'SET_CURRENT_INFO_MESSAGE';
export const SET_MODIFIABLE_MESSAGE = 'SET_MODIFIABLE_MESSAGE';
export const SET_MOVING_MESSAGE = 'SET_MOVING_MESSAGE';

//---Alert actions
export const SET_ALERT_DATA = 'SET_ALERT_DATA';

//---UserInfo actions
export const SET_CURRENT_USER_INFO = 'SET_CURRENT_USER_INFO';
export const SET_MODIFIABLE_USER_INFO = 'SET_MODIFIABLE_USER_INFO';

//---Search actions
export const SET_SEARCH_CHANNELS = 'SET_SEARCH_CHANNELS';
export const SET_SEARCH_MESSAGES = 'SET_SEARCH_MESSAGES';
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT';
export const SET_SEARCH_TYPE = 'SET_SEARCH_TYPE';

//---New messages notification actions
export const SET_NEW_PRIVATE_MESSAGES_COUNT = 'SET_NEW_PRIVATE_MESSAGES_COUNT';
export const INCREMENT_NEW_PRIVATE_MESSAGES_COUNT = 'INCREMENT_NEW_PRIVATE_MESSAGES_COUNT';

//---Moving items actions
export const SET_PARENT_ITEMS_LIST = 'SET_PARENT_ITEMS_LIST';

//---Auth actions
export const SET_USER_ID = 'SET_USER_ID';
export const SET_USER_ROLE = 'SET_USER_ROLE';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
//export const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN';
export const SET_ACCESS_TOKEN_EXPIRES_IN = 'SET_ACCESS_TOKEN_EXPIRES_IN';

//---Remote actions (отправляются на сервер и приходят с сервера)
export const JOIN_ROOM = 'JOIN_ROOM';
export const LEAVE_ROOM = 'LEAVE_ROOM';

export const UPDATE_SECTIONS = 'UPDATE_SECTIONS';

export const UPDATE_SECTION_BY_ID = 'UPDATE_SECTION_BY_ID';
export const DELETE_SECTION_BY_ID = 'DELETE_SECTION_BY_ID';

export const UPDATE_SUBSECTION_BY_ID = 'UPDATE_SUBSECTION_BY_ID';
export const DELETE_SUBSECTION_BY_ID = 'DELETE_SUBSECTION_BY_ID';

export const UPDATE_CHANNEL_BY_ID = 'UPDATE_CHANNEL_BY_ID';
export const DELETE_CHANNEL_BY_ID = 'DELETE_CHANNEL_BY_ID';

export const UPDATE_MESSAGE_BY_ID = 'UPDATE_MESSAGE_BY_ID';
export const DELETE_MESSAGE_BY_ID = 'DELETE_MESSAGE_BY_ID';

export const UPDATE_USER = 'UPDATE_USER';

export const UPDATE_PRIVATE_CHANNEL_BY_ID = 'UPDATE_PRIVATE_CHANNEL_BY_ID';
export const DELETE_PRIVATE_CHANNEL_BY_ID = 'DELETE_PRIVATE_CHANNEL_BY_ID';




