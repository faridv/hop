import styled from 'styled-components';

export const LayoutStyled = styled.div`
    height: 100%;
    width: 100%;
    background: url('/path/to/bg-overlay.png'),
    linear-gradient(0deg, rgba(0, 0, 0, .1), rgba(0, 0, 0, .1)),
    url('/path/to/bg.jpg');
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
