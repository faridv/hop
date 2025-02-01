import styled from 'styled-components';

const backgrounds: string[] = [
  `url(${process.env.PUBLIC_URL}/bg-overlay.png)`,
  `url(${process.env.PUBLIC_URL}/bg.jpg)`,
];

export const LayoutStyled = styled.div<{ appVisible: boolean }>`
    display: ${(props) => (props.appVisible ? 'block' : 'none')};
    position: relative;
    z-index: 999;
    height: 100%;
    width: 100%;
    background: ${backgrounds[0]}, linear-gradient(0deg, rgba(0, 0, 0, .1), rgba(0, 0, 0, .1)), ${backgrounds[1]};
    background-size: auto, auto, 100% auto;
    background-position: center, center, top center;
    background-repeat: repeat, no-repeat, no-repeat;
    background-attachment: scroll, scroll, scroll;
    background-color: #212931;

    #content {
        width: calc(100% - 280px);
        height: calc(100% - 80px);
        position: absolute;
        top: 80px;
        right: ${process.env.REACT_APP_DIRECTION === 'rtl' ? '280px' : 'auto'};
        left: ${process.env.REACT_APP_DIRECTION === 'rtl' ? 'auto' : '280px'};
    }
`;
