import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageRouter from './pageRouter';
import React from 'react';

function MainRouting() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<PageRouter/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default MainRouting;
