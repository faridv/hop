import React from 'react';
import styled from 'styled-components';
import MenuItem from './MenuItem';
import { menuItems } from '../../data/menu-items';


const MenuStyled = styled.div`
    display: flex;
    flex-direction: column;
    padding: .5rem;
`;

function Menu() {

  return (
    <MenuStyled>
      <ul>
        {menuItems.map((item, index) => (
          <MenuItem
            key={`menu-${index}`}
            route={`${process.env.PUBLIC_URL}/app/${item.route}`}>
            {item.icon} {item.title}
          </MenuItem>
        ))}
      </ul>
    </MenuStyled>
  );
}

export default Menu;
