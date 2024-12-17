import React from 'react';
import { Link } from 'react-router-dom';
import { Container, ForgotContainer } from './style';

export const RememberComponent: React.FC = () => {
  return (
    <Container>
      <Link to="/recover-password">
        <ForgotContainer>
          <p>Forgot your password?</p>
        </ForgotContainer>
      </Link>
    </Container>
  );
};
