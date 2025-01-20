import React, { useEffect } from 'react';
import styled from 'styled-components';
import Menu from '../Menu';
import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { useLocation } from 'react-router-dom';

const DrawerStyled = styled.div<{ hasFocusChild?: boolean; }>`
    width: 280px;
    background: rgba(255, 255, 255, .175);
    height: calc(100% - 80px);
    bottom: 0;
    right: ${process.env.REACT_APP_DIRECTION === 'rtl' ? '0' : 'auto'};
    left: ${process.env.REACT_APP_DIRECTION === 'rtl' ? 'auto' : '0'};
    position: absolute;
`;

function Drawer({ focusKey: focusKeyParam }: { focusKey: string }) {

  const location = useLocation();

  const {
    ref,
    focusSelf,
    hasFocusedChild,
    focusKey
    // setFocus, -- to set focus manually to some focusKey
    // navigateByDirection, -- to manually navigate by direction
    // pause, -- to pause all navigation events
    // resume, -- to resume all navigation events
    // updateAllLayouts, -- to force update all layouts when needed
    // getCurrentFocusKey -- to get the current focus key
  } = useFocusable({
    focusable: true,
    saveLastFocusedChild: true,
    trackChildren: true,
    autoRestoreFocus: true,
    isFocusBoundary: false,
    focusKey: focusKeyParam,
    preferredChildFocusKey: null as any,
    onArrowPress: () => true,
  });

  useEffect(() => {
    focusSelf();
  }, [focusSelf, location]);

  return (
    <FocusContext.Provider value={focusKey}>
      <DrawerStyled id="sidebar" ref={ref} hasFocusChild={hasFocusedChild}>
        <Menu/>
      </DrawerStyled>
    </FocusContext.Provider>
  );
}

export default Drawer;
