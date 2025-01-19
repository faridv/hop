import styled from 'styled-components';


export const LoadingContainerStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;
export const LoadingStyled = styled.div`
    position: relative;
    display: flex;

    &:before, &:after {
        content: '';
        width: 15px;
        height: 15px;
        display: inline-block;
        position: relative;
        margin: 0 5px;
        border-radius: 50%;
        color: #FFF;
        background: currentColor;
        box-shadow: 50px 0, -50px 0;
        animation: left 1s infinite ease-in-out;
    }

    &:after {
        color: #f1c40f;
        animation: right 1.1s infinite ease-in-out;
    }


    @keyframes right {
        0%, 100% {transform: translateY(-10px) }
        50% { transform: translateY(10px) }
    }

    @keyframes left {
        0%, 100% { transform: translateY(10px) }
        50% { transform: translateY(-10px) }
    }
`;
