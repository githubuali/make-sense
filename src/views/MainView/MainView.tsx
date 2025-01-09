import React, { useEffect, useState } from 'react';
import './MainView.scss';
import { TextButton } from '../Common/TextButton/TextButton';
import classNames from 'classnames';
import { EditorFeatureData, IEditorFeature } from '../../data/info/EditorFeatureData';

import ImagesDropZone from './ImagesDropZone/ImagesDropZone';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../store/auth/actionCreators';
import { logoutApi } from '../../api/auth';
import { getAllMissionTypes, getNumberTaggedImagesByUserId } from '../../api/makesense';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';

interface MissionType {
    id: string;
    isActive: boolean;
    name: string;
    type: string;
}

const MainView: React.FC = () => {
    const [projectInProgress, setProjectInProgress] = useState(false);
    const [projectCanceled, setProjectCanceled] = useState(false);
    const [numberImages, setNumberImages] = useState(0);
    const [missionTypes, setMissionTypes] = useState<MissionType[]>([]);
    const [missionTypeActiveId, setMissionTypeActiveId] = useState("");
    const [showMissionTypes, setShowMissionTypes] = useState(true);

    const dispatch = useDispatch()

    const userId = useSelector((state: { auth: { user: { id: string } } }) => state.auth.user.id)

    useEffect(() => {
            getNumberTaggedImagesByUserId(userId)
                .then((res) => setNumberImages(res))
                .catch((err) => console.error(err));
            getAllMissionTypes()
                .then((res) => setMissionTypes(res))
                .catch((err) => console.error(err));
        }, [])

    const startProject = () => {
        setProjectInProgress(true);
        setShowMissionTypes(false);
    };

    const endProject = () => {
        setProjectInProgress(false);
        setProjectCanceled(true);
        setShowMissionTypes(true);
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

    const handleSelectChange = (event: SelectChangeEvent) => {
        const missionTypeId = event.target.value;
        setMissionTypeActiveId(missionTypeId)
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
                        src={'ico/tag_vision.png'}
                    />

                <div>
                    <p
                    style={{color: "white"}}
                    >
                        Number of images tagged: {numberImages}
                    </p>
                </div>

                {
                    !projectInProgress &&
                    <TextButton
                        label={'LOG OUT'}
                        onClick={logout}
                        style={{color: 'white', boxShadow: 'white 0 0 0 2px inset', width: 'fit-content'}}
                    />
                }
                {projectInProgress && <TextButton
                    label={'Go Back'}
                    onClick={endProject}
                    style={{position: 'inherit' ,boxShadow: 'white 0 0 0 2px inset', width: 'fit-content'}}
                />}
                </div>
                <div className='EditorFeaturesWrapper'>
                    {getEditorFeatureTiles()}
                </div>
                <div className='TriangleVertical'>
                    <div className='TriangleVerticalContent' />
                </div>
            
            </div>
            <div className='RightColumn'>
                <div />
                <ImagesDropZone missionTypeId={missionTypeActiveId} />
                <div className='SocialMediaWrapper'>
                </div>
                <div>
                    {(missionTypes && showMissionTypes) && 
                    <FormControl style={{width: "15vw"}}>
                        <InputLabel id="select-mission-type-label">Mission Type</InputLabel>
                        <Select
                        labelId="select-mission-type-label"
                        id="select-mission-type"
                        // value={missionTypeActiveName ? missionTypeActiveName : ""}
                        label="MissionType"
                        onChange={handleSelectChange}
                        input={<OutlinedInput label="MissionType" />}
                        >
                        {
                            missionTypes.map((type) => {
                                return (<MenuItem key={type.id} value={type.id} >{type.name}</MenuItem>
                            )})
                        }
                        </Select>
                    </FormControl>
                    }
                </div>
                {!projectInProgress && <TextButton
                    isDisabled={missionTypeActiveId === "" ? true : false}
                    label={'Get Started'}
                    onClick={startProject}
                    externalClassName={'get-started-button'}
                />}
            </div>
        </div>
    );
};

export default MainView;
