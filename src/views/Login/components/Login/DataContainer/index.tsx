import React from 'react';
import { Container, FormContainer,  Icon,  TitleContainer, TopImg } from './style';
import { LoginForm } from '../LoginForm';
import { Login } from '../../../Login'
import { AuthSelector } from '../../../../../store/selectors/authSelect'
import { GeneralLoader } from '../../../../Common/Loader';
import { ServerErrorComponent } from '../../../../Common/ServerError';
import { getIcons } from '../../../../../utils/IconManager';
import { useSelector } from 'react-redux';

export const DataContainer: React.FC = () => {
  const isLoading = useSelector(AuthSelector.isUserLoading);
  const error = useSelector(AuthSelector.userError);

  const component = (
    <Container>
      <TopImg src="./login_top.png" />
      <FormContainer>
        {isLoading ? (
          <GeneralLoader component />
        ) : (
          <>
            <Icon>{getIcons('uali-icon')}</Icon>
            <img src='ico/uali_logo.svg'/>
            {error === 'Server error' ? (
              <ServerErrorComponent />
            ) : (
              <>
                <TitleContainer>
                  <h1>Hello! We welcome you.</h1>
                  <h2>Complete your login information to start operating on the platform.</h2>
                </TitleContainer>
                <LoginForm />
              </>
            )}
          </>
        )}
      </FormContainer>
    </Container>
  );

  return <Login>{component}</Login>;
};
