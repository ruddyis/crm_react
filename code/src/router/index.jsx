import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Index from '../pages/Index';

const AppRouter = () => {
  return (
    <div>
      <HashRouter>
            <Routes>
                <Route exact path="/" element={ <Login></Login> }></Route>
                <Route path="/*" element={ <Index></Index> }></Route>
            </Routes>
        </HashRouter>
    </div>
  );
}
export default AppRouter
