import styled from 'styled-components';

export const SepehrStyled = styled.div`
    height: 100%;
    position: relative;
    ::-webkit-scrollbar { display: none; }
    
    .powered-by {
        position: absolute; top: 0; left: 0;
        padding: .5rem;
        font-size: .75rem;
        color: #666;
        img {
            display: inline-block;
            width: 60px;
        }
    }
`;

export const SepehrCategoriesContainerStyled = styled.div`
    height: 100%; overflow: hidden; overflow-y: auto;
`;
