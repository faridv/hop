import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageRouter from './pages/pageRouter';
import React from 'react';
import { Splash } from './pages/Splash';
import { useAppManager } from './contexts/app-manager';

function MainRouting() {

  const { setKeys, toggleButton, buttonVisible } = useAppManager();

  setKeys(0x1 + 0x2 + 0x4 + 0x8 + 0x10 + 0x20 + 0x40 + 0x80);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={'*'}
          element={<Splash toggleButton={toggleButton} buttonVisible={buttonVisible} />}
        />
        <Route path={`app/*`} element={<PageRouter/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default MainRouting;
