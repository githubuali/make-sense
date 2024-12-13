import styled from 'styled-components';

export const Container = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 16px;
  gap: 8px;

  width: 100%;
  height: 40px;
  margin-top: 20px;

  background: #006fee;
  border-radius: 10px;
  border: none;

  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  font-family: Nunito;

  color: #ffffff;
  cursor: pointer;

  :disabled {
    display: flex;
    height: 40px;
    padding: 0px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-radius: 12px;
    border: 1px solid #d9d9d9;
    background: #f5f5f5;
  }
`;
