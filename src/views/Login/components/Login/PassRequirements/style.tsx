import styled from 'styled-components';

export const Container = styled.div<{ inline: boolean }>`
  display: grid;
  grid-template-columns: ${props => (props.inline ? '1fr 1fr 1fr ' : '1fr 1fr')};

  width: 100%;
  height: ${props => props.inline && '50px'};

  gap: 20px;
`;

export const Requirement = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 8px;
`;

export const Text = styled.p<{ validation?: boolean }>`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  margin: 0%;

  color: ${props => (props.validation ? '#6B7983' : '#0B0D0E')};
`;
