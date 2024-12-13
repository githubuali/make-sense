import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 500px;
  height: 100%;

  a {
    color: #6b7983;
    position: absolute;
    left: 60px;
    bottom: 60px;
  }
`;

export const Title = styled.h1`
  color: rgba(11, 12, 14, 0.85);
  font-family: Nunito;
  font-size: 24px;
  font-weight: 600;
  margin: 0;
`;

export const Subtitle = styled.p`
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  color: #6b7983;
  margin: 40px 0px 30px 0px;
  width: 350px;
`;

export const MailInput = styled.div`
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

export const BackContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 19px;

  width: 173px;
  height: 17px;
  cursor: pointer;
`;
