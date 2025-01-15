import styled, { keyframes } from 'styled-components';

const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const StyledInitializer = styled.div`
    position: absolute;
    bottom: 40px;
    right: 40px;

    &.fade-in {
        animation: ${fadeIn} 1s forwards;
    }

    &.fade-out {
        animation: ${fadeOut} 1s forwards;
    }
`;

export const StyledSplash = styled.div`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: .5s all;
  z-index: 800;
`;
