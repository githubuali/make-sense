import React from 'react';
import { Container, Fade, ImageContainer, Mask } from './style';

interface Props {
  children: JSX.Element;
}

export const Login: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <Mask>{children}</Mask>
      <ImageContainer background={`url(./login_background2.png)`}>
        <Fade />
      </ImageContainer>
    </Container>
  );
};
