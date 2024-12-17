import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 25px;

  width: 100%;
`;

export const PassInput = styled.div<{ validated: boolean }>`
  display: flex;
  flex-direction: column;

  width: 100%;
  gap: 10px;

  p {
    color: rgba(0, 0, 0, 0.45);
    font-family: Nunito;
    font-size: 14px;
    font-weight: 400;
    margin: 0;
  }

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #f5f6fb;
    border-radius: 10px;

    width: calc(100% - 32px);
    height: 44px;

    padding: 0px 12px 0px 16px;
    border: ${props => (props.validated ? '1px solid #009900' : '1px solid  #D9D9D9')};
  }

  input {
    width: 100%;
    height: 44px;
    padding: 0;

    background: #f5f6fb;
    border-radius: 4px;
    border: none;
  }

  input:focus {
    outline: none;
  }

  img {
    cursor: pointer;
  }
`;

export const Tick = styled.img`
  cursor: default;
  padding-right: 12px;
`;

export const Click = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Cancel = styled.a`
  background: #999999;
  color: white;
  font-size: 18px;
  padding: 10px 13px;
  border: 1px solid #808080;
  border-radius: 5px;
  &:hover {
    transition: 0.5s;
    background: #8c8c8c;
  }
`;

export const Approbe = styled.a`
  background: #999999;
  color: white;
  font-size: 18px;
  padding: 10px 13px;
  border: 1px solid #808080;
  border-radius: 5px;
  background: #ff3333;
  border: 1px solid #cc0000;
  margin-left: 20px;
  &:hover {
    transition: 0.5s;
    background: #e60000;
  }
`;
