import React from 'react';
import './App.scss';
import EditorView from './views/EditorView/EditorView';
import MainView from './views/MainView/MainView';
import { ProjectType } from './data/enums/ProjectType';
import { AppState } from './store';
import { connect } from 'react-redux';
import PopupView from './views/PopupView/PopupView';
import MobileMainView from './views/MobileMainView/MobileMainView';
import { ISize } from './interfaces/ISize';
import { Settings } from './settings/Settings';
import { SizeItUpView } from './views/SizeItUpView/SizeItUpView';
import { PlatformModel } from './staticModels/PlatformModel';
import classNames from 'classnames';
import NotificationsView from './views/NotificationsView/NotificationsView';
import { RoboflowAPIDetails } from './store/ai/types';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { DataContainer } from './views/Login/components/Login/DataContainer';
import { ProtectedResolver } from './resolvers/ProtectedResolver';

interface IProps {
    projectType: ProjectType;
    windowSize: ISize;
    isObjectDetectorLoaded: boolean;
    isPoseDetectionLoaded: boolean;
    isYOLOV5ObjectDetectorLoaded: boolean;
    roboflowAPIDetails: RoboflowAPIDetails;
}

const App: React.FC<IProps> = ({
    projectType,
    windowSize,
    isObjectDetectorLoaded,
    isPoseDetectionLoaded,
    isYOLOV5ObjectDetectorLoaded,
    roboflowAPIDetails,
}) => {

    const selectRoute = () => {
        if (!!PlatformModel.mobileDeviceData.manufacturer && !!PlatformModel.mobileDeviceData.os) {
            return <MobileMainView />;
        }
        if (!projectType) {
            return <MainView />;
        } else {
            if (windowSize.height < Settings.EDITOR_MIN_HEIGHT || windowSize.width < Settings.EDITOR_MIN_WIDTH) {
                return <SizeItUpView />;
            } else {
                return <EditorView />;
            }
        }
    };

    const isAILoaded = isObjectDetectorLoaded
        || isPoseDetectionLoaded
        || isYOLOV5ObjectDetectorLoaded
        || (roboflowAPIDetails.model !== '' && roboflowAPIDetails.key !== '' && roboflowAPIDetails.status);

    return (
        <Router>
                <Routes>
                    <Route  element={ <ProtectedResolver redirectPath='/login'/> }>
                        <Route path="/" element={
                            <div className={classNames('App', { 'AI': isAILoaded })} draggable={false}>
                                {selectRoute()}
                                <PopupView/>
                                <NotificationsView />
                            </div>
                        } />
                    </Route>
                    <Route path="/login" element={<DataContainer />} />
                    <Route path="*" element={<Navigate to={'/login'} replace />} />
                </Routes>
        </Router>
    );
};

const mapStateToProps = (state: AppState) => ({
    projectType: state.general.projectData.type,
    windowSize: state.general.windowSize,
    isObjectDetectorLoaded: state.ai.isSSDObjectDetectorLoaded,
    isPoseDetectionLoaded: state.ai.isPoseDetectorLoaded,
    isYOLOV5ObjectDetectorLoaded: state.ai.isYOLOV5ObjectDetectorLoaded,
    roboflowAPIDetails: state.ai.roboflowAPIDetails,
});

export default connect(
    mapStateToProps
)(App);