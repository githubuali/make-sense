import React, { PropsWithChildren, useState } from 'react';
import './ImagesDropZone.scss';
import { TextButton } from '../../Common/TextButton/TextButton';
import { ImageData } from '../../../store/labels/types';
import { connect } from 'react-redux';
import { addImageData, updateActiveImageIndex } from '../../../store/labels/actionCreators';
import { AppState } from '../../../store';
import { ProjectType } from '../../../data/enums/ProjectType';
import { PopupWindowType } from '../../../data/enums/PopupWindowType';
import { updateActivePopupType, updateProjectData } from '../../../store/general/actionCreators';
import { ProjectData } from '../../../store/general/types';
import { ImageDataUtil } from '../../../utils/ImageDataUtil';
import { sortBy } from 'lodash';
import { getUntaggedImages } from '../../../api/makesense';
import { fetchFileFromUrl } from '../../../utils/imgFileCreator';
import { ClipLoader } from 'react-spinners';

interface IProps {
    missionTypeId: string;
    updateActiveImageIndexAction: (activeImageIndex: number) => any;
    addImageDataAction: (imageData: ImageData[]) => any;
    updateProjectDataAction: (projectData: ProjectData) => any;
    updateActivePopupTypeAction: (activePopupType: PopupWindowType) => any;
    projectData: ProjectData;
}

export interface TagFile {
    id: string;
    date: Date;
    url: string;
}

const ImagesDropZone: React.FC<IProps> = (props: PropsWithChildren<IProps>) => {
    const [untaggedFiles, setUntaggedFiles] = useState<File[]>([]);
    const [fileError, setFileError] = useState(false);
    const [filesLoading, setFilesLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false); // New state
    const [flag, setFlag] = useState(true);

    const getFiles = () => {
        setFilesLoading(true);
        getUntaggedImages(props.missionTypeId)
            .then((data: TagFile[]) => {
                // Convert each signed URL to a File object
                return Promise.all(data.map(fetchFileFromUrl));
            })
            .then((files: File[]) => {
                // Sort files by name (or date if you prefer)
                const sortedFiles = sortBy(files, (file) => file.name);

                // Update local state with the files
                setUntaggedFiles(sortedFiles);
            })
            .catch(() => setFileError(true))
            .finally(() => setFilesLoading(false));
    };

    const handleGetButtonClick = () => {
        if (!isButtonDisabled) {
            setIsButtonDisabled(true);
            setFlag(false)
            getFiles();
        }
    };

    const getButtonContent = () => {
        if (filesLoading)
            return <ClipLoader size={70} color={'black'} loading={true} />;

        if (fileError)
            return (
                <>
                    <img draggable={false} alt={'error'} src={'ico/bug.png'} />
                </>
            );

        if (flag) {
            return (
                <div>
                    <img
                        draggable={false}
                        alt={'upload'}
                        src={'ico/box-opened.png'}
                    />
                    <p className="extraBold">Click here to get images</p>
                </div>
            )  
        }
        else if (untaggedFiles.length === 0) {
            return (
                <div>
                    <img
                        draggable={false}
                        alt={'no more imgs'}
                        src={'ico/ok.png'}
                    />
                    <p className="extraBold">There are no more images to tag</p>
                </div>
            )  
        }
        else if (untaggedFiles.length === 1)
            return (
                <div>
                    <img
                        draggable={false}
                        alt={'uploaded'}
                        src={'ico/box-closed.png'}
                    />
                    <p className="extraBold">1 image loaded</p>
                </div>
            );
        else
            return (
                <div>
                    <img
                        draggable={false}
                        key={1}
                        alt={'uploaded'}
                        src={'ico/box-closed.png'}
                    />
                    <p key={2} className="extraBold">
                        {untaggedFiles.length} images loaded
                    </p>
                </div>
            );
    };

    const startEditor = (projectType: ProjectType) => {
        if (untaggedFiles.length > 0) {
            const files = sortBy(untaggedFiles, (item: File) => item.name);
            props.updateProjectDataAction({
                ...props.projectData,
                type: projectType,
                missionTypeId: props.missionTypeId,
            });
            props.updateActiveImageIndexAction(0);
            props.addImageDataAction(
                files.map((file: File) =>
                    ImageDataUtil.createImageDataFromFileData(file, file.name)
                )
            );
            props.updateActivePopupTypeAction(
                PopupWindowType.INSERT_LABEL_NAMES
            );
        }
    };

    const startEditorWithObjectDetection = () =>
        startEditor(ProjectType.OBJECT_DETECTION);


    return (
        <div className="ImagesDropZone">
            <div
                className={`GetButton ${isButtonDisabled ? 'disabled' : ''}`}
                onClick={handleGetButtonClick}
                style={{
                    pointerEvents: isButtonDisabled ? 'none' : 'auto',
                    opacity: isButtonDisabled ? 0.5 : 1,
                }}
            >
                {getButtonContent()}
            </div>
            {!!untaggedFiles.length && <div className="DropZoneButtons">
                <TextButton
                    label={'Start editing'}
                    isDisabled={!untaggedFiles.length}
                    onClick={startEditorWithObjectDetection}
                />
            </div>}
        </div>
    );
};

const mapDispatchToProps = {
    updateActiveImageIndexAction: updateActiveImageIndex,
    addImageDataAction: addImageData,
    updateProjectDataAction: updateProjectData,
    updateActivePopupTypeAction: updateActivePopupType,
};

const mapStateToProps = (state: AppState) => ({
    projectData: state.general.projectData,
});

export default connect(mapStateToProps, mapDispatchToProps)(ImagesDropZone);
