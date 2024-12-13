import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;

  background-color: rgb(245, 246, 251);
`;

export const ImageContainer = styled.div<{ background: string }>`
  background-image: ${props => props.background};
  background-repeat: no-repeat;
  background-size: cover;
  flex: 1;
  height: 100%;
`;

export const Fade = styled.div`
  background: linear-gradient(59deg, #fff 0%, rgba(255, 255, 255, 0) 100%);
  width: 100%;
  height: 100%;
`;

export const Mask = styled.div`
  height: 100%;
  background: linear-gradient(
    87.31deg,
    #ffffff 39.88%,
    rgba(255, 255, 255, 0.92) 46.56%,
    rgba(255, 255, 255, 0.779929) 54.2%,
    rgba(255, 255, 255, 0.5) 66.63%,
    rgba(255, 255, 255, 0.4) 69.82%
  );
  border-radius: 20px;
  position: relative;

  @media (max-width: 800px) {
    width: 500px;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
