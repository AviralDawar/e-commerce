import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useState} from "react";

import '../stylesheets/Auth.css'

export default ({ title, buttonName, redirectPage, redirectText, handleSubmit }) => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const navigate = useNavigate()
    const location = useLocation()

    const submitHandler= async (e) => {
        e.preventDefault()
        try {
            await handleSubmit( { 
              email: email,
              password: password 
            })
            console.log(location)
            if (location.pathname === "/signup"){
              console.log("switching")
              sessionStorage.setItem('temp-signup', email)
              navigate('/accountpop')
              return
            }
            console.log("logging in")
            navigate('/home')
        }
        catch (err) {
            console.log(err)
        }
    }

	return (
    <form id="container-box" onSubmit={submitHandler}>
      <span id="auth-title">{ title }</span>
      <input placeholder="Email" onChange={ e => setEmail(e.target.value) }/>
      <input placeholder="Password" type="password" onChange={ e => setPassword(e.target.value)}/>
      <button id="auth-submission" type="submit">{ buttonName }</button>
			<Link to={ redirectPage } id="redirect-button">{redirectText}</Link>
    </form>
  );
}