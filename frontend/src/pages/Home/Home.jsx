import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

import NavBar from "../../components/NavBar";
import ProductList from "./ProductList";
import WelcomePage from "./WelcomePage";

import './Home.css'

export default () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!sessionStorage.getItem('user-token'))
            navigate('/login')
    })
  return (
    <div id="home">
      <NavBar />
      { sessionStorage.getItem('user-token') && <ProductList /> }
      { !sessionStorage.getItem('user-token') && <WelcomePage /> }
    </div>
  );
}