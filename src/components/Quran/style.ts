import styled from 'styled-components';

export const QuranSurahListStyled = styled.div`
    height: 100%;

    ::-webkit-scrollbar { display: none; }

    ul {
        height: 100%;
        overflow: hidden;
        overflow-y: auto;
        list-style: none;
        padding: 1rem;
        
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
    }
`;
