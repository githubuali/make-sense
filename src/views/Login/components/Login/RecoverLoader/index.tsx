import React from 'react';
import { Container } from './style';

interface Props {
  component?: boolean;
}

export const RecoverLoader: React.FC<Props> = ({ component = false }) => {
  return (
    <Container component={component}>
      <img alt="" src="/uali_loader.gif" style={{ maxWidth: '200px' }} />
    </Container>
  );
};
