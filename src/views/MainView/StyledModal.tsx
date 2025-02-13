import React from "react";
import ReactModal from "react-modal";
import { MissionType } from "./ImagesDropZone/ImagesDropZone";
import { Button, Select } from "antd";
import { StyledContainer } from "./ImagesDropZone/styles";

interface StyledModalProps {
    showModal: boolean;
    onRequestClose: () => void;
    missionTypes: Array<MissionType>;
    handleMissionTypeSelection: (missionType: MissionType) => void;
    handleSelectButtonClick: () => void;
    missionTypeActive: MissionType;
}

export default function StyledModal({
    showModal,
    onRequestClose,
    missionTypes,
    handleMissionTypeSelection,
    handleSelectButtonClick,
    missionTypeActive
    }: StyledModalProps) {
    return (
            <ReactModal
            isOpen={showModal}
            onRequestClose={onRequestClose}
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={false}
            contentLabel="Processing Modal"
            style={{
                overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                zIndex: 1000,
                backdropFilter: 'blur(4px)',
                },
                content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                padding: '24px',
                backgroundColor: '#1f1f1f',
                borderRadius: '8px',
                border: '1px solid #434343',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                },
            }}
            >
                <StyledContainer>
                    <Select
                    showSearch
                    placeholder="Select a mission type"
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={missionTypes.map((missionType) => ({
                        value: missionType.id,
                        label: missionType.name,
                    }))}
                    size="large"
                    onSelect={(id) => {
                        const selectedMissionType = missionTypes.find(
                        (missionType) => missionType.id === id
                        );
                        if (selectedMissionType) {
                        handleMissionTypeSelection(selectedMissionType);
                        }
                    }}
                    />
                    <Button
                    onClick={handleSelectButtonClick}
                    disabled={!missionTypeActive}
                    >
                        Confirm
                    </Button>
                </StyledContainer>
            </ReactModal>
    )
}
