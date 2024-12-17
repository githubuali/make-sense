import React, { useState } from 'react';
import './MainView.scss';
import { TextButton } from '../Common/TextButton/TextButton';
import classNames from 'classnames';
import { EditorFeatureData, IEditorFeature } from '../../data/info/EditorFeatureData';

import ImagesDropZone from './ImagesDropZone/ImagesDropZone';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../store/auth/actionCreators';
import { logoutApi } from '../../api/auth';

const MainView: React.FC = () => {
    const [projectInProgress, setProjectInProgress] = useState(false);
    const [projectCanceled, setProjectCanceled] = useState(false);

    const dispatch = useDispatch()

    const startProject = () => {
        setProjectInProgress(true);
    };

    const endProject = () => {
        setProjectInProgress(false);
        setProjectCanceled(true);
    };

    const logout = () => {
        logoutApi()
        .then(() => dispatch(logoutAction()))
        .catch(() => console.log('LOGOUT FAILED'))
    }

    const getClassName = () => {
        return classNames(
            'MainView', {
            'InProgress': projectInProgress,
            'Canceled': !projectInProgress && projectCanceled
        }
        );
    };

    // const DarkTooltip = styled(({ className, ...props }: TooltipProps) => (
    //     <Tooltip {...props} classes={{ popper: className }} />
    // ))(({ theme }) => ({
    //     [`& .${tooltipClasses.tooltip}`]: {
    //         backgroundColor: '#171717',
    //         color: '#ffffff',
    //         boxShadow: theme.shadows[1],
    //         fontSize: 11,
    //         maxWidth: 120
    //     },
    // }));

    // const getSocialMediaButtons = (size: ISize) => {
    //     return SocialMediaData.map((data: ISocialMedia, index: number) => {
    //         return <DarkTooltip
    //             key={index}
    //             disableFocusListener={true}
    //             title={data.tooltipMessage}
    //             TransitionComponent={Fade}
    //             TransitionProps={{ timeout: 600 }}
    //             placement='left'
    //         >
    //             <div>
    //                 <ImageButton
    //                     buttonSize={size}
    //                     image={data.imageSrc}
    //                     imageAlt={data.imageAlt}
    //                     href={data.href}
    //                 />
    //             </div>
    //         </DarkTooltip>;
    //     });
    // };

    const getEditorFeatureTiles = () => {
        return EditorFeatureData.map((data: IEditorFeature) => {
            return <div
                className='EditorFeaturesTiles'
                key={data.displayText}
            >
                <div
                    className='EditorFeaturesTilesWrapper'
                >
                    <img
                        draggable={false}
                        alt={data.imageAlt}
                        src={data.imageSrc}
                    />
                    <div className='EditorFeatureLabel'>
                        {data.displayText}
                    </div>
                </div>
            </div>;
        });
    };

    return (
        <div className={getClassName()}>
            <div className='Slider' id='lower'>
                <div className='TriangleVertical'>
                    <div className='TriangleVerticalContent' />
                </div>
            </div>

            <div className='Slider' id='upper'>
                <div className='TriangleVertical'>
                    <div className='TriangleVerticalContent' />
                </div>
            </div>

            <div className='LeftColumn'>
                <div className={'LogoWrapper'}>
                    <img
                        draggable={false}
                        alt={'main-logo'}
                        src={'ico/main-image-color.png'}
                    />
                {
                    !projectInProgress &&
                    <TextButton
                        label={'LOG OUT'}
                        onClick={logout}
                        style={{color: 'white', boxShadow: 'white 0 0 0 2px inset', width: 'fit-content'}}
                    />
                }
                </div>
                <div className='EditorFeaturesWrapper'>
                    {getEditorFeatureTiles()}
                </div>
                <div className='TriangleVertical'>
                    <div className='TriangleVerticalContent' />
                </div>
                {projectInProgress && <TextButton
                    label={'Go Back'}
                    onClick={endProject}
                />}
               
            </div>
            <div className='RightColumn'>
                <div />
                <ImagesDropZone />
                {/* <div className='SocialMediaWrapper'>
                    {getSocialMediaButtons({ width: 30, height: 30 })}
                </div> */}
                {!projectInProgress && <TextButton
                    label={'Get Started'}
                    onClick={startProject}
                    externalClassName={'get-started-button'}
                />}
            </div>
        </div>
    );
};

export default MainView;
