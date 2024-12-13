import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 20px;

  width: 100%;
  flex: 1;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 75px;
  gap: 10px;

  p {
    color: rgba(0, 0, 0, 0.45);
    font-family: Nunito;
    font-size: 14px;
    font-weight: 400;
    margin: 0;
  }
  input {
    height: 40px;
  }
`;

export const LoginError = styled.h1`
  color: #ff4d4f;
  font-family: Nunito;
  font-size: 14px;
  font-weight: 400;
  margin: 0;
`;
