import styled from "styled-components";

export const InfoStyled = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2em;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  border-radius: 8px;
  text-align: justify;

  &.visible {
    display: block;
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
  }

  &.hidden {
    display: block;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }

  h3 {
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 1em;
  }
  p {
    margin-bottom: 1em;
    &.ltr {
      direction: ltr;
    }
  }
  ul {
    margin-bottom: 1em;
    li {
      margin-bottom: 0.5em;
    }
  }
  .yellow {
    color: yellow;
    display: inline-block;
    // box-shadow: 0 0 0 2px #ddd;
    border-radius: 3px;
    margin-left: .5rem;
    svg {
      margin: 0;
      padding: 0;
      border: 1px solid #999;
    }
  }
`;

export const Backdrop = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  opacity: ${({ isVisible }) => (isVisible ? "1" : "0")};
`;
