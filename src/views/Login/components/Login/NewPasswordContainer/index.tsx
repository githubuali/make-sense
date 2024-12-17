import React from 'react';
import { NewPasswordForm } from '../NewPasswordForm';
import { Container, Title } from './style';
import { Login } from '../../../layouts/Login/Login';
import { FormContainer, Icon, TopImg } from '../DataContainer/style';
import { getIcons } from '../../../assets/iconManger';

export const NewPasswordContainer = () => {
  const component = (
    <Container>
      <TopImg src="./login_top.png" />
      <FormContainer>
        <Icon>{getIcons('uali-icon')}</Icon>
        <Title>Set New Password.</Title>
        <NewPasswordForm />
      </FormContainer>
    </Container>
  );

  return <Login children={component} />;
};
