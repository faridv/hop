import styled from 'styled-components';

export const AyahContainerStyled = styled.div<{ focused: boolean }>`
    
    background: ${({ focused }) => focused ? 'rgba(255, 255, 255, .1)' : 'transparent'};
    padding: .5rem;

    span {
        display: block; padding: 0 10px; font-size: 1.25rem;
        font-family: 'Vazirmatn', sans-serif;
        position: absolute;
        top: 0;
        right: -80px;

        &:before, &:after { font-family: 'Scheherazade', 'Quran', 'Uthmani', serif; font-size: 2rem; }

        &:before {
            content: '﴿';
            padding-left: 3px;
        }

        &:after {
            content: '﴾';
            padding-right: 3px;
        }
    }

    .translation {
        font-size: 1rem;
        font-family: 'Vazirmatn', sans-serif;
    }
`;
