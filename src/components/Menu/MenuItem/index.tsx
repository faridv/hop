import { NavLink, NavLinkRenderProps, useNavigate } from 'react-router-dom';
import React, { RefObject } from 'react';
import { MenuItemStyled } from './style';
import { useFocusable } from '../../../libs/spacial-navigation';


interface MenuItemProps {
  route: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  title?: string;
}

function MenuItem(props: MenuItemProps) {

  const navigate = useNavigate();
  const { ref, focused }: { ref: RefObject<any>, focused: boolean } = useFocusable({
    onEnterPress: (): void => {
      navigate(`/app/${props.route}`);
    },
  });


  return (
    <MenuItemStyled ref={ref} focused={focused}>
      <NavLink
        to={`/app/${props.route}`}
        className={(isActive: NavLinkRenderProps) => isActive.isActive ? 'active' : ''}
      >
        {props.children as any}
      </NavLink>
    </MenuItemStyled>
  );
}

export default MenuItem;
