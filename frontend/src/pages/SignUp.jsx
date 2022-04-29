import Auth from "../components/Auth";

import handleSignup from "../services/handleSignup";

import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default () => {
  const navigate = useNavigate()
  useEffect(() => {
    if (sessionStorage.getItem('user-token'))
      navigate('/home')
  })
  return (
    <Auth 
      title="Sign Up" 
      buttonName="Register" 
      redirectPage="/login" 
      redirectText="Already have an account? Sign in!"
      handleSubmit={handleSignup}
    />
  );
}