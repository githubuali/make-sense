import React from 'react';
import { Container, FormContainer,  TitleContainer, TopImg } from './style';
import { LoginForm } from '../LoginForm';
import { Login } from '../../../Login'
// import { useSelector } from 'react-redux';

export const DataContainer: React.FC = () => {
  // const { status } = useSelector((state: Store) => state.session);
  const component = (
    <Container>
      <TopImg src="./login_top.png" />
      <FormContainer>
        {/* {status.isLoading ? (
          <GeneralLoader component />
        ) : ( */}
          <>
            {/* <Icon>{getIcons('uali-icon')}</Icon> */}
            <img src='ico/uali_logo.svg'/>
            {/* {status.error === 'Server error' ? (
              <ServerErrorComponent />
            ) : ( */}
              <>
                <TitleContainer>
                  <h1>Hello! We welcome you.</h1>
                  <h2>Complete your login information to start operating on the platform.</h2>
                </TitleContainer>
                <LoginForm />
              </>
            {/* )} */}
          </>
        {/* )} */}
      </FormContainer>
    </Container>
  );

  return <Login>{component}</Login>;
};
