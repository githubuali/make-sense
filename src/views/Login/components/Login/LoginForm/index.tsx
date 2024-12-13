import React, { useState } from 'react';
import { Form, InputContainer } from './style';
import { RememberComponent } from '../RememberComponent';
import { useDispatch } from 'react-redux';
import { SubmitButton } from '../SubmitButton/index';
import { Input } from 'antd';
import { loginUserAction } from '../../../../../store/auth/actionCreators'

export const LoginForm: React.FC = () => {
  const dispatch = useDispatch();

  const [mail, setMail] = useState<string>('');

  const [password, setPassword] = useState<string>('');


  //Submit form and get user data
  const loginValidation = async () => {
    const action = await loginUserAction({ 
      username: mail.toLocaleLowerCase(), 
      password: password 
    });
    dispatch(action);
  };


  return (
    <Form onSubmit={loginValidation}>
      <InputContainer>
        <p>Account Email:</p>
        <Input
          placeholder="Enter Account email"
          value={mail}
          onChange={e => setMail(e.target.value)}
          height={'45px'}
        />
      </InputContainer>
      <InputContainer>
        <p>Password:</p>
        <Input.Password
          placeholder="Enter password"
          iconRender={visible =>
            visible ? <img alt="eye" src={'./eye.png'} /> : <img alt="eye" src={'eye-slash.png'} />
          }
          onChange={e => setPassword(e.target.value)}
        />
      </InputContainer>

      {/* {status.error === 'Login error' && (
        <LoginError>
          The username or password entered is incorrect. Please try again or reset your password.
        </LoginError>
      )} */}
      <RememberComponent />
      <SubmitButton text="Login" disabled={!(mail && password)} />
    </Form>
  );
};
