import styled from 'styled-components';

export const NewsStyled = styled.div`
    height: 100%;
    padding: .5rem .5rem;
    //overflow: hidden;
    //overflow-y: auto;
    
    ::-webkit-scrollbar { display: none; }
`;

export const NewsScrollWrapperStyled = styled.div`
    display: flex;
    flex-direction: row;
    
    flex-wrap: wrap;
    color: #fff;
    overflow-x: hidden;
    overflow-y: auto;
    flex-shrink: 1;
    flex-grow: 1;
    height: calc(100% - 1rem);
`;
