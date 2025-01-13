import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Launcher from '../components/launcher';

function PageRouter() {
  return (
    <Routes>
      <Route path={'/'} element={<Launcher/>} />
    </Routes>
  )
}

export default PageRouter;
