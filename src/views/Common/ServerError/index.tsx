import React from 'react';
import { Container, TextContainer } from './style';
import { getIcons } from '../../../utils/IconManager';

export const ServerErrorComponent: React.FC = () => {
  return (
    <Container>
      {getIcons('server-error2')}
      <TextContainer>
        <h1>We are having temporary technical issues logging in</h1>
        <h2>
          We are working to fix this as soon as possible. Please try to log in later. If the problem
          continues, contact us. We are sorry for the inconvenience caused.
        </h2>
      </TextContainer>
    </Container>
  );
};
