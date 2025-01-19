import styled from 'styled-components';

export const SepehrItemWrapperStyled = styled.div`
    //margin-left: 22px;
    display: flex;
    flex-direction: column;
`;
export const SepehrItemInnerStyled = styled.div<{ focused: boolean }>`
    border-color: white;
    border-style: solid;
    border-width: ${({ focused }) => (focused ? '6px' : 0)};
    box-sizing: border-box;
    border-radius: 7px;
    width: 200px;
    padding: .5rem;
`;

export const SepehrItemTitle = styled.div`
    color: white;
    margin-top: 10px;
    font-size: 1rem;
    font-weight: 400;
`;

export const SepehrItemImageWrapper = styled.div`
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
    overflow: hidden;
`;
