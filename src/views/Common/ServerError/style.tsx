import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  h1 {
    margin: 0;
    color: rgba(0, 0, 0, 0.85);
    text-align: center;
    font-family: Nunito;
    font-size: 22px;
    font-weight: 500;
  }
  h2 {
    color: rgba(0, 0, 0, 0.45);
    text-align: center;
    font-family: Nunito;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
  }
`;
