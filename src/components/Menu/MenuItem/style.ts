import styled from 'styled-components';

export const MenuItemStyled = styled.li<{focused: boolean}>`
    list-style-type: none;
    padding: 5px 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: white;
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 400;

    a {
        text-decoration: none;
        color: white;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        height: 100%;
        border-radius: 3px;
        padding: .5rem;
        transition: .3s all;

        &.active {
            color: #f1c40f;
            outline: 2px solid #f1c40f;
        }

        outline: ${({ focused }) => focused ? `2px solid #fff !important;` : '0 none'};
        
        &:hover, &.focused /**/ {
            outline: 2px solid #fff;
        }
    }

    svg {
        width: 1.5rem; height: 1.5rem;
        margin-left: 1rem;
    }
`;
