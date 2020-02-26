'use strict';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Main from '../views/main';
import * as sectionApi from '../../api/sectionApi';
import * as subSectionApi from '../../api/subSectionApi';
import * as sectionActions from '../../actions/sectionActions';
import * as subSectionActions from '../../actions/subSectionActions';
import { joinRoom, leaveRoom, deleteSubSectionById } from '../../actions/remoteActions';
import apiConst from '../../constants/apiConst';
import { setParentItemsList } from '../../actions/modifyingActions';
import * as baseUtils from '../../utils/baseUtils';

// const mapStateToProps = function(state) {
//     debugger;
//     return {
//         sections: state.get('sections')
//     };
// }

// export default connect(mapStateToProps, actions)(Content);


// контейнер для главной страницы форума (список разделов)
class MainContainer extends PureComponent {

    constructor(props) {
        super(props);

        // флаг, есть ли у юзера права добавлять новые разделы (костылик)
        this.canAdd = false;

        this.getSections = this.getSections.bind(this);
    }

    componentDidMount() {
        return this.getSections();
    }

    componentWillUnmount() {
        // при уходе с главной страницы отправляем на сервер событие о выходе из комнаты с defaultRoomId
        this.props.leaveRoom(apiConst.defaultRoomId);

        this.props.resetSections();
        this.props.setParentItemsList(null);
    }

    componentDidUpdate(prevProps) {
        // если подраздел из раздела в списке выбран для перемещения,
        // то нужно установить список разделов (для перемещения в нем)
        if ((this.props.movingSection || this.props.movingSubSection) &&
            !this.props.parentItemsList) {
                this.props.setParentItemsList(this.props.sections || []);
        }

        // если изменились данные токенов, могли измениться доступные элементы управления, перерисоваем изменившиеся
        if (this.props.accessToken !== prevProps.accessToken ||
            this.props.userRole !== prevProps.userRole) {
                return this.getSections();
        }
    }

    // получить список разделов
    getSections() {
        return sectionApi.getSections()
            .then(sections => {
                if (sections) {
                    this.canAdd = sections.canAdd || false;

                    this.props.setSections(sections.items || []);
                }

                this.props.joinRoom(apiConst.defaultRoomId);
                
                return true;
            })
            .catch(error => {
                baseUtils.showErrorMessage(error);
                return false;
            })
    }
    
    render() {
        debugger;
        
        return (
            <Main
                canAdd = {this.canAdd}
                sections = {this.props.sections}
                currentInfoSection = {this.props.currentInfoSection}
                setCurrentInfoSection = {this.props.setCurrentInfoSection}
                modifiableSection = {this.props.modifiableSection}
                movingSection = {this.props.movingSection}
                setModifiableSection = {this.props.setModifiableSection}
                setMovingSection = {this.props.setMovingSection}
                modifySection = {sectionApi.modifySection}
                deleteSection = {sectionApi.deleteSection}

                currentInfoSubSection = {this.props.currentInfoSubSection}
                modifiableSubSection = {this.props.modifiableSubSection}
                movingSubSection = {this.props.movingSubSection}
                setCurrentInfoSubSection = {this.props.setCurrentInfoSubSection}
                setModifiableSubSection = {this.props.setModifiableSubSection}
                setMovingSubSection = {this.props.setMovingSubSection}
                modifySubSection = {subSectionApi.modifySubSection}
                deleteSubSection = {subSectionApi.deleteSubSection}
                deleteSubSectionById = {this.props.deleteSubSectionById}

                parentItemsList = {this.props.parentItemsList}
                resetParentItemsList = {this.props.resetParentItemsList}

                colorTheme = {this.props.colorTheme}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        sections: store.sectionState.get('sections'),
        currentInfoSection: store.sectionState.get('currentInfoSection'),
        modifiableSection: store.sectionState.get('modifiableSection'),
        movingSection: store.sectionState.get('movingSection'),
        currentInfoSubSection: store.subSectionState.get('currentInfoSubSection'),
        modifiableSubSection: store.subSectionState.get('modifiableSubSection'),
        movingSubSection: store.subSectionState.get('movingSubSection'),
        parentItemsList: store.modifyingState.get('parentItemsList'),

        accessToken: store.authState.get('accessToken'),
        userRole: store.authState.get('userRole'),

        colorTheme: store.forumDesignState.get('colorTheme'),
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        setSections: function(items) {
            dispatch(sectionActions.setSections(items));
        },
        resetSections: function() {
            dispatch(sectionActions.setSections(null));
        },
        setModifiableSection: function(item) {
            dispatch(sectionActions.setModifiableSection(item));
        },
        setMovingSection: function(item) {
            dispatch(sectionActions.setMovingSection(item));
        },
        setCurrentInfoSection: function(item) {
            dispatch(sectionActions.setCurrentInfoSection(item));
        },
        setModifiableSubSection: function(item) {
            dispatch(subSectionActions.setModifiableSubSection(item));
        },
        setMovingSubSection: function(item) {
            dispatch(subSectionActions.setMovingSubSection(item));
        },
        setCurrentInfoSubSection: function(item) {
            dispatch(subSectionActions.setCurrentInfoSubSection(item));
        },
        setParentItemsList: function(items) {
            dispatch(setParentItemsList(items));
        },
        resetParentItemsList: function() {
            dispatch(setParentItemsList(null));
        },
        joinRoom: function(id) {
            dispatch(joinRoom(id));
        },
        leaveRoom: function(id) {
            dispatch(leaveRoom(id));
        },
        deleteSubSectionById: function(subSectionId, sectionId) {
            dispatch(deleteSubSectionById(subSectionId, sectionId));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);