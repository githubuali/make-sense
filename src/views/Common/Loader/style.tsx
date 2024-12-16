import styled from 'styled-components';

export const Container = styled.div<{ component?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${props => (props.component ? '100%' : '100vw')};
  height: ${props => (props.component ? '100%' : '100vh')};
`;
