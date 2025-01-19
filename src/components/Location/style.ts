import styled from 'styled-components';

export const LocationStyled = styled.div`
    border: 1px solid white;
    margin: .5rem;
    padding: .5rem;
    border-radius: 5px;

    &.active {
        background: rgba(255, 255, 255, .1);
        border-color: #f1c40f;
        color: #f1c40f;
    }

    &.focused {
        background: #f1c40f;
    }
`;
