import React, { useEffect } from 'react';
import Header from '../Header';
import Drawer from '../Drawer';
import { Outlet, useNavigate } from 'react-router-dom';
import { init } from '../../libs/spacial-navigation';
import { LayoutStyled } from './style';
import { useKeyboardEvents } from '../../contexts/keyboard-events';
import { useAppManager } from '../../contexts/app-manager';


function Layout(/*{ children }: { children: React.ReactNode }*/) {

  const { register } = useKeyboardEvents('layout');
  const { destroy } = useAppManager();
  const navigate = useNavigate();

  useEffect(() => {
    register('back,backspace', () => {
      navigate(-1);
    });
    register('red,r', () => {
      destroy();
    });
    register('yellow,y', () => {
      navigate('/app/info');
    });
  }, [register, navigate]);

  init({
    // debug: true,
    // visualDebug: true,
    distanceCalculationMethod: 'center',
    rtl: true,
  });


  return (
    <LayoutStyled>
      <Header/>
      <Drawer focusKey='MENU'/>
      <div id="content">
        <Outlet/>
      </div>
    </LayoutStyled>
  );
}

export default Layout;
