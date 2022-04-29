import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Home from './pages/Home/Home'
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Cart from './pages/Cart/Cart'
import Transaction from './pages/Transaction/Transaction'

import './stylesheets/Base.css'
import Accountpop from './components/Accountpop';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/home" element={ <Home /> } />
      <Route path="/signup" element={ <SignUp /> }  />
      <Route path="/login" element={ <Login /> } />
      <Route path="/cart" element={ <Cart /> } />
      <Route path="/transaction" element={ <Transaction /> } />
      <Route path="/accountpop" element={ <Accountpop /> } />
      <Route path="*" element={ <Navigate replace to="/home" /> } />
    </Routes>
  </BrowserRouter>
);


