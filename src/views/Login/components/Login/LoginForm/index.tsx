/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {  useState } from 'react';
import { Form, InputContainer } from './style';
import { RememberComponent } from '../RememberComponent';
import { useDispatch } from 'react-redux';
import { SubmitButton } from '../SubmitButton/index';
import { Input } from 'antd';
import { loginFailureAction, loginRequestAction, loginSuccessAction } from '../../../../../store/auth/actionCreators'
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../../../../../api/auth'

export const LoginForm: React.FC = () => {
  const dispatch = useDispatch(); // Correctly type the dispatch

  const [mail, setMail] = useState<string>('');

  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate()


// Submit form and get user data
const loginValidation = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    dispatch(loginRequestAction());
    const user = await loginApi({ 
      email: mail.toLocaleLowerCase(), 
      password: password 
    });
    dispatch(loginSuccessAction(user.data.data));
    navigate('/');
  } catch (error: any) {
    dispatch(loginFailureAction(error.message || 'Login failed'));
    console.error('Error logging in', error);
  }
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
