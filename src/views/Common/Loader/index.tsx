import React from 'react';
import { Container } from './style';

interface Props {
  component?: boolean;
  small?: boolean;
}

export const GeneralLoader: React.FC<Props> = ({ component = false, small = false }) => {
  return (
    <Container component={component}>
      <img
        alt=""
        src={`${window.location.origin}/uali_loader.gif`}
        style={small ? { maxWidth: '150px' } : { maxWidth: '200px' }}
      />
    </Container>
  );
};
