import styled from 'styled-components'

export const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 320px;

    .ant-select {
        width: 100%;
        margin-bottom: 24px;

        .ant-select-selector {
        border-radius: 6px !important;
        border-color: #434343 !important;
        background-color: #141414 !important;
        color: white !important;
        
        &:hover {
            border-color: #177ddc !important;
        }
        }

        .ant-select-selection-placeholder {
        color: rgba(255, 255, 255, 0.45);
        }

        .ant-select-selection-item {
        color: rgba(255, 255, 255, 0.85);
        }
    }

    .ant-btn {
        width: 100%;
        height: 40px;
        background: #177ddc;
        border: none;
        border-radius: 6px;
        color: white;
        font-weight: 500;
        font-size: 14px;
        
        &:hover:not(:disabled) {
        background: #1884e0;
        }

        &:disabled {
        background: #303030;
        color: rgba(255, 255, 255, 0.3);
        }
    }
`
