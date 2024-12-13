import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 500px;
  height: 100%;

  @media (max-width: 800px) {
    width: 70%;
    background: white;
    padding: 0;
    justify-self: center;
    align-self: center;
    height: 80%;
  }
`;

export const TopImg = styled.img`
  width: 100%;
  height: 115px;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 90px);
  height: calc(100% - 80px - 115px);
  padding: 40px 45px;
  gap: 40px;
  overflow: auto;
`;

export const Icon = styled.div`
  height: 68px;
  width: 74px;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  h1 {
    color: rgba(11, 12, 14, 0.85);
    font-family: Nunito;
    font-size: 24px;
    font-weight: 600;
    margin: 0;
  }
  h2 {
    color: rgba(11, 12, 14, 0.45);
    font-family: Nunito;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 0;
  }
`;

export const LoginLoader = styled.img`
  margin-right: 200px;
  margin-top: 100px;
`;
