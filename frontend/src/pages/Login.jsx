import Auth from "../components/Auth";

import handleLogin from "../services/handleLogin"

import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default () => {
  const navigate =useNavigate()
  useEffect(() => {
    if (sessionStorage.getItem('user-token'))
      navigate('/home')
  })
  return (
    <Auth 
      title="Login"
      buttonName="Sign in"
      redirectPage="/signup" 
      redirectText="Don't have an account? Sign up!"
      handleSubmit={handleLogin}
    />
  );
}